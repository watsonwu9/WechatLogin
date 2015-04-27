//
//  WeixinLoginManager.h
//  FacebookLogin
//
//  Created by YI WU on 19/4/15.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WXApi.h"
#import "RCTBridgeModule.h"
#import "RCTLog.h"
#import  "RCTBridge.h"


@interface WeixinLoginManager : NSObject<WXApiDelegate,RCTBridgeModule>
@property(nonatomic) NSDictionary *SharedDictionaryUserInfo;

+(WeixinLoginManager*)sharedInstance;


@end
