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





@implementation WeixinLoginManager
@synthesize SharedDictionaryUserInfo;
@synthesize bridge = _bridge;

+(WeixinLoginManager*)sharedInstance{
  static WeixinLoginManager *myInstance = nil;
  if (myInstance == nil) {
    myInstance = [[[self class] alloc] init];
    myInstance.SharedDictionaryUserInfo = [[NSDictionary alloc]init];
  }
  
 
  
  return myInstance;
}
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
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"UserInfo" body:@{@"nickname": @"BruceWong"}];
    NSLog(@"you just send a authrequest successfully");
    
  }

 
};



@end
