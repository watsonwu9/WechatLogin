//
//  WeixinLoginManager.m
//  FacebookLogin
//
//  Created by YI WU on 19/4/15.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import "WeixinLoginManager.h"
#import "WXApi.h"
#import "RCTEventDispatcher.h"
#import "RCTBridgeModule.h"
//#import "RCTLog.h"
#import  "RCTBridge.h"



NSString *const WECHAT_APP_ID = @"wx469a2a130e24f2a8";
NSString *const WECHAT_APP_SECRET = @"f14e557eba84c4a45b180128ddca93b2dd2";




@implementation WeixinLoginManager
//@synthesize SharedDictionaryUserInfo;
@synthesize bridge = _bridge;

//+(WeixinLoginManager*)sharedInstance{
//  static WeixinLoginManager *myInstance = nil;
//  if (myInstance == nil) {
//    myInstance = [[[self class] alloc] init];
//    myInstance.DictionaryUserInfo = [[NSDictionary alloc]init];
//  }
//  //self.DictionaryUserInfo = [[NSDictionary alloc] init];
//  
//  return myInstance;
//}


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendAuthReqToWX) {

  
  SendAuthReq *req = [[SendAuthReq alloc] init];
  
  req.scope = @"snsapi_userinfo,snsapi_base";
  req.state = @"0744";
  BOOL success = [WXApi sendReq:req];
  if (!success) {
    NSLog(@"you fail to send the auth request");
   
  }else{
    //[self.bridge.eventDispatcher sendDeviceEventWithName:@"UserInfo" body:self.SharedDictionaryUserInfo];
    //[_bridge.eventDispatcher sendDeviceEventWithName:@"UserInfo" body:@{@"nickname": @"BruceWong"}];
    NSLog(@"you just send a authrequest successfully");
    //[self sendDataToJS]; //uncomment this and the sendDeviceEventWithName method gets called.
    
  }

 
};



-(void)sendDataToJS {
  
  NSLog(@"you are in sendDataToJS");
  [_bridge.eventDispatcher sendDeviceEventWithName:@"UserInfo" body:@{@"nickname": @"BruceWU"}];
  
};




-(void) onResp:(BaseResp*)resp
{
  if (resp.errCode == -4)
  {
    NSLog(@"user declined");

  }else if (resp.errCode == -2)
  {
    NSLog(@"user cancelled");
  }else if (resp.errCode ==0)
  {
    NSLog(@"permission granted");
    SendAuthResp *aresp = (SendAuthResp *)resp;
    
    NSLog(@"haha thanks watson");
    [self getAccessTokenWithCode:aresp.code];
    [self sendDataToJS]; //uncomment this BUT the sendDeviceEventWithName method does NOT get called.

   // [_bridge.eventDispatcher sendDeviceEventWithName:@"UserInfo" body:@{@"nickname": @"BruceWong"}];
  }


}

-(void)getAccessTokenWithCode:(NSString *)code
{
  NSString *urlString =[NSString stringWithFormat:@"https://api.weixin.qq.com/sns/oauth2/access_token?appid=%@&secret=%@&code=%@&grant_type=authorization_code",WECHAT_APP_ID,WECHAT_APP_SECRET,code];
  NSURL *url = [NSURL URLWithString:urlString];
  
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    
    NSString *dataString = [NSString stringWithContentsOfURL:url encoding:NSUTF8StringEncoding error:nil];
    NSData *data = [dataString dataUsingEncoding:NSUTF8StringEncoding];
    dispatch_async(dispatch_get_main_queue(), ^{
      if (data) {
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
        if ([dic objectForKey:@"errcode"]) {
          NSLog(@"error in fetching the data from wechat");
          
        }else{
          [self getUserInfoWithAccessToken:[dic objectForKey:@"access_token"] andOpenId:[dic objectForKey:@"openid"]];
        }
        
        
      }
    });
  });
}

- (void)getUserInfoWithAccessToken:(NSString *)accessToken andOpenId:(NSString *)openId
{
  
  NSLog(@"about to get userinfo ");
  NSString *urlString =[NSString stringWithFormat:@"https://api.weixin.qq.com/sns/userinfo?access_token=%@&openid=%@",accessToken,openId];
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSURL *zoneUrl = [NSURL URLWithString:urlString];
    NSString *zoneStr = [NSString stringWithContentsOfURL:zoneUrl encoding:NSUTF8StringEncoding error:nil];
    NSData *data = [zoneStr dataUsingEncoding:NSUTF8StringEncoding];
    dispatch_async(dispatch_get_main_queue(), ^{
      if (data) {
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
        
        if ([dic objectForKey:@"errcode"]) {
          [self getAccessTokenWithRefreshToken:[[NSUserDefaults standardUserDefaults]objectForKey:@"WeiXinRefreshToken"]];
        }
        /*
         {
         city = Haidian;
         country = CN;
         headimgurl = "http://wx.qlogo.cn/mmopen/FrdAUicrPIibcpGzxuD0kjfnvc2klwzQ62a1brlWq1sjNfWREia6W8Cf8kNCbErowsSUcGSIltXTqrhQgPEibYakpl5EokGMibMPU/0";
         language = "zh_CN";
         nickname = "xxx";
         openid = oyAaTjsDx7pl4xxxxxxx;
         privilege =     (
         );
         province = Beijing;
         sex = 1;
         unionid = oyAaTjsxxxxxxQ42O3xxxxxxs;
         }
         */
        
        else{
          self.DictionaryUserInfo = dic;
          //[self sendUserInfoToJS];
          
        }
      }
    });
    
  });
}

- (void)getAccessTokenWithRefreshToken:(NSString *)refreshToken
{
  NSString *urlString =[NSString stringWithFormat:@"https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=%@&grant_type=refresh_token&refresh_token=%@",WECHAT_APP_ID,refreshToken];
  NSURL *url = [NSURL URLWithString:urlString];
  
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSString *dataString = [NSString stringWithContentsOfURL:url encoding:NSUTF8StringEncoding error:nil];
    NSData *data = [dataString dataUsingEncoding:NSUTF8StringEncoding];
    dispatch_async(dispatch_get_main_queue(), ^{
      if (data)
      {
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
        if ([dic objectForKey:@"errcode"])
        {
          
        }else{
          self.DictionaryUserInfo = dic;
          //[self sendUserInfoToJS];
          
        }
      }
    });
  });
}








@end
