#import <UserNotifications/UserNotifications.h>

@interface NotificationService : UNNotificationServiceExtension

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    
    NSDictionary *userInfo = request.content.userInfo;
    NSString *attachmentsUrlString = nil;
    
    // 1. Air-tight payload extraction with strict type verification to prevent native crashes
    if (userInfo[@"image"] && [userInfo[@"image"] isKindOfClass:[NSString class]]) {
        attachmentsUrlString = userInfo[@"image"];
    } else if (userInfo[@"body"] && [userInfo[@"body"] isKindOfClass:[NSDictionary class]]) {
        // This targets the exact structural modification your Supabase Edge function sends through Expo
        NSDictionary *expoBodyDict = userInfo[@"body"];
        if (expoBodyDict[@"image"] && [expoBodyDict[@"image"] isKindOfClass:[NSString class]]) {
            attachmentsUrlString = expoBodyDict[@"image"];
        }
    } else if (userInfo[@"media-url"] && [userInfo[@"media-url"] isKindOfClass:[NSString class]]) {
        attachmentsUrlString = userInfo[@"media-url"];
    } else if (userInfo[@"fcm_options"] && [userInfo[@"fcm_options"] isKindOfClass:[NSDictionary class]]) {
        NSDictionary *fcmOptions = userInfo[@"fcm_options"];
        if (fcmOptions[@"image"] && [fcmOptions[@"image"] isKindOfClass:[NSString class]]) {
            attachmentsUrlString = fcmOptions[@"image"];
        }
    } else if (userInfo[@"notification"] && [userInfo[@"notification"] isKindOfClass:[NSDictionary class]]) {
        NSDictionary *notificationDict = userInfo[@"notification"];
        if (notificationDict[@"image"] && [notificationDict[@"image"] isKindOfClass:[NSString class]]) {
            attachmentsUrlString = notificationDict[@"image"];
        }
    }
    
    // Safety Fallback: If no image URL is present, immediately show the text notification
    if (!attachmentsUrlString) {
        self.contentHandler(self.bestAttemptContent);
        return;
    }
    
    // 2. Validate URL string composition
    NSURL *url = [NSURL URLWithString:attachmentsUrlString];
    if (!url) {
        self.contentHandler(self.bestAttemptContent);
        return;
    }
    
    // 3. Initiate background download session for the media asset
    NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
    NSURLSessionDownloadTask *task = [session downloadTaskWithURL:url completionHandler:^(NSURL * _Nullable location, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        
        // If the download fails or network drops, safely bypass and display text
        if (error || !location) {
            self.contentHandler(self.bestAttemptContent);
            return;
        }
        
        // 4. Safely extract and fallback on file extensions (iOS requires a valid extension to render previews)
        NSString *fileExtension = [url pathExtension];
        if (!fileExtension || fileExtension.length == 0) {
            fileExtension = @"jpg"; // Standard baseline safe fallback
        }
        
        // 5. Create a strictly isolated temporary sandbox directory to prevent namespace collisions
        NSString *uniqueDirectoryName = [[NSUUID UUID] UUIDString];
        NSString *temporaryDirectoryPath = [NSTemporaryDirectory() stringByAppendingPathComponent:uniqueDirectoryName];
        
        NSError *directoryError = nil;
        [[NSFileManager defaultManager] createDirectoryAtPath:temporaryDirectoryPath withIntermediateDirectories:YES attributes:nil error:&directoryError];
        if (directoryError) {
            self.contentHandler(self.bestAttemptContent);
            return;
        }
        
        // 6. Define absolute target destination file path
        NSString *fileName = [NSString stringWithFormat:@"notification_media.%@", fileExtension];
        NSString *temporaryFilePath = [temporaryDirectoryPath stringByAppendingPathComponent:fileName];
        NSURL *temporaryFileURL = [NSURL fileURLWithPath:temporaryFilePath];
        
        // 7. Move the downloaded asset out of the transient cache into our sandbox directory
        NSError *moveError = nil;
        [[NSFileManager defaultManager] moveItemAtURL:location toURL:temporaryFileURL error:&moveError];
        if (moveError) {
            self.contentHandler(self.bestAttemptContent);
            return;
        }
        
        // 8. Construct the rich push attachment object
        NSError *attachmentError = nil;
        UNNotificationAttachment *attachment = [UNNotificationAttachment attachmentWithIdentifier:@"NotificationImageAttachment" URL:temporaryFileURL options:nil error:&attachmentError];
        if (attachmentError || !attachment) {
            self.contentHandler(self.bestAttemptContent);
            return;
        }
        
        // 9. Successfully append the rich content image and handoff to iOS for display
        self.bestAttemptContent.attachments = @[attachment];
        self.contentHandler(self.bestAttemptContent);
    }];
    
    [task resume];
}

- (void)serviceExtensionTimeWillExpire {
    // OS Hard Timeout Fallback: If the image download stalls on slow cellular networks,
    // this instantly forces the delivery of the text components right before iOS terminates the process.
    if (self.contentHandler && self.bestAttemptContent) {
        self.contentHandler(self.bestAttemptContent);
    }
}

@end