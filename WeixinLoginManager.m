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
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendAuthReqToWX) {

  
  SendAuthReq *req = [[SendAuthReq alloc] init];
 RCTLog(@"you are about to send the auth request");
  
  req.scope = @"snsapi_userinfo,snsapi_base";
  req.state = @"0744";
  BOOL success = [WXApi sendReq:req];
  if (!success) {
    NSLog(@"you fail to send the auth request");
   
  }else{
    //[self.bridge.eventDispatcher sendDeviceEventWithName:@"UserInfo" body:@{@"nickname": @"BruceWong"}];
    NSLog(@"you just send a authrequest successfully");
    
  }

 
};



@end
