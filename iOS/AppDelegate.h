/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>
#import "WXApi.h"
#import "RCTBridgeModule.h"
#import  "RCTBridge.h"
#import "RCTLog.h"


@interface AppDelegate : UIResponder <UIApplicationDelegate,WXApiDelegate,RCTBridgeModule>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) NSDictionary *DictionaryUserInfo;



@end
