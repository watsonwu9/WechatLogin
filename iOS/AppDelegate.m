/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "RCTRootView.h"
#import "RCTEventDispatcher.h"
#import "WeixinLoginManager.h"





@implementation AppDelegate
{
  RCTBridge *myBridge;
}


@synthesize bridge = _bridge;


RCT_EXPORT_MODULE();

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  [WXApi registerApp:@"wx469a2a130e24f2a8"];
  //self.DictionaryUserInfo = [[NSDictionary alloc] init];

  // Loading JavaScript code - uncomment the one you want.

  // OPTION 1
  // Load from development server. Start the server from the repository root:
  //
  // $ npm start
  //
  // To run on device, change `localhost` to the IP address of your computer, and make sure your computer and
  // iOS device are on the same Wi-Fi network.
  jsCodeLocation = [NSURL URLWithString:@"http://172.27.35.29:8081/index.ios.bundle"];
  //jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];

  // OPTION 2
  // Load from pre-bundled file on disk. To re-generate the static bundle, run
  //
  // $ curl 'http://localhost:8081/index.ios.bundle?dev=false&minify=true' -o iOS/main.jsbundle
  //
  // and uncomment the next following line
  // jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"yiqixie"
                                                   launchOptions:launchOptions];
//  self.myBridge =[[[self class] alloc]init];
  myBridge = rootView.bridge;

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

-(BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
  //return [WXApi handleOpenURL:url delegate:self];
   return [WXApi handleOpenURL:url delegate:myBridge.modules[@"WeixinLoginManager"]];
}

-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  //return [WXApi handleOpenURL:url delegate:self];
   return [WXApi handleOpenURL:url delegate:myBridge.modules[@"WeixinLoginManager"]];
}


//-(void) onResp:(BaseResp*)resp
//{
//  if (resp.errCode == -4)
//  {
//    NSLog(@"user declined");
//    
//  }else if (resp.errCode == -2)
//  {
//    NSLog(@"user cancelled");
//  }else if (resp.errCode ==0)
//  {
//    NSLog(@"permission granted");
//    SendAuthResp *aresp = (SendAuthResp *)resp;
//    [self getAccessTokenWithCode:aresp.code];
//  }
//  
//  
//}

//-(void)getAccessTokenWithCode:(NSString *)code
//{
//  NSString *urlString =[NSString stringWithFormat:@"https://api.weixin.qq.com/sns/oauth2/access_token?appid=%@&secret=%@&code=%@&grant_type=authorization_code",WECHAT_APP_ID,WECHAT_APP_SECRET,code];
//  NSURL *url = [NSURL URLWithString:urlString];
//  
//  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
//    
//    NSString *dataString = [NSString stringWithContentsOfURL:url encoding:NSUTF8StringEncoding error:nil];
//    NSData *data = [dataString dataUsingEncoding:NSUTF8StringEncoding];
//    dispatch_async(dispatch_get_main_queue(), ^{
//      if (data) {
//        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
//        if ([dic objectForKey:@"errcode"]) {
//          NSLog(@"error in fetching the data from wechat");
//          
//        }else{
//          [self getUserInfoWithAccessToken:[dic objectForKey:@"access_token"] andOpenId:[dic objectForKey:@"openid"]];
//        }
//        
//        
//      }
//    });
//  });
//}
//
//- (void)getUserInfoWithAccessToken:(NSString *)accessToken andOpenId:(NSString *)openId
//{
//  
//  NSLog(@"about to get userinfo ");
//  NSString *urlString =[NSString stringWithFormat:@"https://api.weixin.qq.com/sns/userinfo?access_token=%@&openid=%@",accessToken,openId];
//  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
//    NSURL *zoneUrl = [NSURL URLWithString:urlString];
//    NSString *zoneStr = [NSString stringWithContentsOfURL:zoneUrl encoding:NSUTF8StringEncoding error:nil];
//    NSData *data = [zoneStr dataUsingEncoding:NSUTF8StringEncoding];
//    dispatch_async(dispatch_get_main_queue(), ^{
//      if (data) {
//        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
//        
//        if ([dic objectForKey:@"errcode"]) {
//          [self getAccessTokenWithRefreshToken:[[NSUserDefaults standardUserDefaults]objectForKey:@"WeiXinRefreshToken"]];
//        }
//        /*
//         {
//         city = Haidian;
//         country = CN;
//         headimgurl = "http://wx.qlogo.cn/mmopen/FrdAUicrPIibcpGzxuD0kjfnvc2klwzQ62a1brlWq1sjNfWREia6W8Cf8kNCbErowsSUcGSIltXTqrhQgPEibYakpl5EokGMibMPU/0";
//         language = "zh_CN";
//         nickname = "xxx";
//         openid = oyAaTjsDx7pl4xxxxxxx;
//         privilege =     (
//         );
//         province = Beijing;
//         sex = 1;
//         unionid = oyAaTjsxxxxxxQ42O3xxxxxxs;
//         }
//         */
//        
//        else{
//          self.DictionaryUserInfo = dic;
//          [self sendUserInfoToJS];
//          
//        }
//      }
//    });
//    
//  });
//}
//
//- (void)getAccessTokenWithRefreshToken:(NSString *)refreshToken
//{
//  NSString *urlString =[NSString stringWithFormat:@"https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=%@&grant_type=refresh_token&refresh_token=%@",WECHAT_APP_ID,refreshToken];
//  NSURL *url = [NSURL URLWithString:urlString];
//  
//  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
//    NSString *dataString = [NSString stringWithContentsOfURL:url encoding:NSUTF8StringEncoding error:nil];
//    NSData *data = [dataString dataUsingEncoding:NSUTF8StringEncoding];
//    dispatch_async(dispatch_get_main_queue(), ^{
//      if (data)
//      {
//        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
//        if ([dic objectForKey:@"errcode"])
//        {
//          
//        }else{
//          self.DictionaryUserInfo = dic;
//          [self sendUserInfoToJS];
//
//        }
//      }
//    });
//  });
//}
//
////RCT_EXPORT_METHOD(sendUserInfoToJS) {
//-(void)sendUserInfoToJS{
//
//  NSLog(@"hi i am %@",[self.DictionaryUserInfo objectForKey:@"nickname"]);
//  //[WeixinLoginManager sharedInstance].SharedDictionaryUserInfo = self.DictionaryUserInfo;
//  
//  //[self.bridge.eventDispatcher sendDeviceEventWithName:@"UserInfo"
//   //                                               body:@{@"nickname":@"jackLEE"}];
// //[self.bridge.eventDispatcher sendDeviceEventWithName:@"UserInfo" body:@{@"nickname": @"Wu dayi",@"openid": @"123456799",@"headimgurl":@"www.apple.com"}];
//  
//}


@end
