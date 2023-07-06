(function(){
'use strict';
/* Start Back History Button */
app.directive("backButton", ["$window", function ($window) {
	return {
		restrict: "A",
		link: function (scope, elem, attrs) {
			elem.bind("click", function () {
				$window.history.back();
			});
		}
	};
}]);	
/* End Back History Button */
/* Star Drag/Upload Picture*/
app.controller('MainController', ['$scope', function ($scope){
  $scope.image = null;
  $scope.imageFileName = '';
  
  $scope.uploadme = {};
  $scope.uploadme.src = '';
}]);

app.directive('fileDropzone', function() {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '='
    },
    link: function(scope, element, attrs) {
      var checkSize,
          isTypeValid,
          processDragOverOrEnter,
          validMimeTypes;
      
      processDragOverOrEnter = function (event) {
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';
        return false;
      };
      
      validMimeTypes = attrs.fileDropzone;
      
      checkSize = function(size) {
        var _ref;
        if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        } else {
          alert("File must be smaller than " + attrs.maxFileSize + " MB");
          return false;
        }
      };

      isTypeValid = function(type) {
        if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
          return true;
        } else {
          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
          return false;
        }
      };
      
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);

      return element.bind('drop', function(event) {
        var file, name, reader, size, type;
        if (event != null) {
          event.preventDefault();
        }
        reader = new FileReader();
        reader.onload = function(evt) {
          if (checkSize(size) && isTypeValid(type)) {
            return scope.$apply(function() {
              scope.file = evt.target.result;
              if (angular.isString(scope.fileName)) {
                return scope.fileName = name;
              }
            });
          }
        };
        file = event.dataTransfer.files[0];
        name = file.name;
        type = file.type;
        size = file.size;
        reader.readAsDataURL(file);
        return false;
      });
    }
  };
})
.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
/* End Drag/Upload Picture*/
/* Directive to detect enter press on keyboard */
        app.directive('myEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.myEnter);
                        });
                        event.preventDefault();
                    }
                });
            };
        });
    /* End of Directive to detect enter press on keyboard */
    /* Directive to detect escape key press on keyboard */
    app.directive('escKey', function () {
      return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          if(event.which === 27) { 
            scope.$apply(function (){
              scope.$eval(attrs.escKey);
            });
            event.preventDefault();
          }
        });
      };
    });
    /* End of Directive to detect escape key press on keyboard */

    /* Start of Directive to input only numeric value */

    app.directive('numberMask', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).numeric();
            }
        }
    });
    /* End of Directive to input only numeric value */

/* End of Directive to detect escape key press on keyboard */
    app.directive('ngcAutoComplete',function($timeout){
      return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.$watch(function () {
                  return element.val();
                }, function(nv, ov) {
                  if(nv !== ov){
                    ngModel.$setViewValue(nv);
                    }
                })
            }
        }
    }); 
/* End of Directive to for AutoComplete */

/* Start of Directive to for password or email match */

app.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                /*console.log('comparing '+modelValue+" and "+scope.otherModelValue+" and comparison is: "+(modelValue == scope.otherModelValue));*/
                return modelValue == scope.otherModelValue;
            };
            scope.$watch("otherModelValue", function() {
                /*console.log('compared');*/
                ngModel.$validate();
            });
        }
    };
});
/* End of Directive to for password or email match */

app.directive('registerUserModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/create-BioDataForm.html',
        controller: 'RegisterController',
    };
});
app.directive('mainHeader', function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/home/header.html',
        controller: 'HeaderController',
    };
});
app.directive('mainFooter', function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/home/footer.html',
    };
});
app.directive('loginUserModal', function () {
    return {
        restrict: 'EA',
        scope:{},
        templateUrl: 'modals/login-window.html',
        controller: 'LoginController',
        link: function(scope, element, attributes, controller) {
           scope.$on('event:auth-loginRequired', function() {
               element.modal('show');
           });
           scope.$on('event:auth-loginConfirmed', function() {
               element.modal('hide');
           });
       }
    };
});
app.directive('stripeCardNumber', ['Stripe', function(Stripe) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, elm, attr, ctrl) {
            if (!ctrl) return;
            ctrl.$validators.cardNumber = function(modelValue, viewValue) {
                return Stripe.card.validateCardNumber(viewValue);
            };
        }
    };
}]);
app.service('Stripe', ['$window',
    function ($window) {
        return $window.Stripe;
    }
]);
app.directive('stripeCvcNumber', ['Stripe', function(Stripe) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, elm, attr, ctrl) {
            if (!ctrl) return;
            ctrl.$validators.cvc = function(modelValue, viewValue) {
                return Stripe.card.validateCVC(viewValue);
            };
        }
    };
}]);
angular.module('easybiodata').directive('userResetPasswordModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/reset-password-email.html',
        controller: function ($scope,$location) {
            $scope.callResetPassword = function(){
                $location.path('/reset-password'); 
                $location.replace();
                $('#userResetPassword').modal('hide');
                //console.log('changing reset password url');
                $('.modal-backdrop').hide();
            }
        }
    };
});
angular.module('easybiodata').directive('userOptPasswordModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/send-opt.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('declineStepOneModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/decline-step1.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('declineStepSecondModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/decline-step2.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('biodataAnotherPersonModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/biodata-another-person.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('userProcessCompleteModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/process-complete.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('preivewUserBiodataModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/preview-biodata.html',
        controller: 'previewBiodataController'
    };
});
angular.module('easybiodata').controller('previewBiodataController', previewBiodataController);
previewBiodataController.$inject = ['$scope','userService'];
function previewBiodataController($scope,userService){

}
angular.module('easybiodata').directive('preivewUserPicModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/preview-profile-pic.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('previewUserPicDashboardModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/preview-profile-pic-dashboard.html',
        controller: function ($scope,$location) {

        }
    };
});
angular.module('easybiodata').directive('paymentSucessMessageModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/payment-success-message.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('uploadUserPhotoModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/upload-photo.html',
        controller: function ($scope,$location) {

        }
    };
});
angular.module('easybiodata').directive('uploadUserPhotosModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/upload-photos.html',
        controller: function ($scope,$location) {

        }
    };
});
angular.module('easybiodata').directive('chooseTemplateModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/choose-template.html',
        controller: 'chooseTemplateController',
    };
});
angular.module('easybiodata').controller('chooseTemplateController', chooseTemplateController);
chooseTemplateController.$inject = ['$scope','userService'];
function chooseTemplateController($scope,userService){
    $scope.changeTemplate = function(selectedTemplate){
        $scope.userprofile.profileTemplate = selectedTemplate;
		//console.log('tempalte choolse');
    }
    $scope.changeSymbol = function(selectedSymbol){
        $scope.userprofile.religionSymbol = selectedSymbol.id;
        // $scope.userprofile.profileSymbol = selectedSymbol;
		//console.log('symbol choolse');
    }
}
angular.module('easybiodata').directive('potentialSpouseModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/potential-spouse.html',
        controller: function ($scope,$location) {

        }
    };
});
angular.module('easybiodata').directive('closeAccountModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/close-account.html',
        controller: function ($scope,$location) {

        }
    };
});
angular.module('easybiodata').directive('messageSentModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/message-sent.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('faqRelationManagerModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/faq-relationManeger.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('fullUserBiodataModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/full-biodata.html',
        controller: function ($scope,$location) {
        }
    };
});
angular.module('easybiodata').directive('shareBiodataFormModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/share-biodata-form.html',
        controller: function ($scope,$location) {
            $scope.shareEmails =  [];
            $scope.shareEmails[0] = ''; 
            $scope.shareEmails[1] = ''; 
            $scope.shareEmails[2] = ''; 
            $scope.shareEmails[3] = ''; 
            $scope.shareEmails[4] = ''; 
            $scope.duplicateEmailsError=false;
            $scope.compareShareEmails=function(){
               for (var i = 0; i < $scope.shareEmails.length; i++) 
                {
                    for (var j = 0; j < $scope.shareEmails.length; j++) 
                    {
                      
                      console.log($scope.shareEmails[i]+" with "+$scope.shareEmails[j]);
                        if (i != j && ($scope.shareEmails[i] != '' && $scope.shareEmails[j] != '')) 
                        {
                            if ($scope.shareEmails[i] == $scope.shareEmails[j]) 
                            {
                                $scope.duplicateEmailsError=true;
                                return true; // means there are duplicate values
                            }
                        }
                    }
                }
                $scope.duplicateEmailsError=false;
                return true;
            }
        }
    };
});
angular.module('easybiodata').directive('contactMessageSentModal', function () {
    return {
        restrict: 'A',
        templateUrl: 'modals/contact-message-sent.html',
        controller: function ($scope,$location) {
        }
    };
});
/* end modals */
app.directive('syncHeight',function () { //declaration; identifier master
    function changeHeight(scope, element, attrs) { //scope we are in, element we are bound to, attrs of that element
      scope.$watch(function(){ //watch any changes to our element
            scope.changeHeight = { //scope variable style, shared with our controller
                height:element[0].offsetHeight+'px', //set the height in style to our elements height
                //width:element[0].offsetWidth+'px' //same with width
            };
            setTimeout(function(){ $('#clickanywhere').click(); },150)
        });
    }
    return {
        restrict: 'AE', //describes how we can assign an element to our directive in this case like <div master></div
        link: changeHeight // the function to link to our element
    };
});
app.directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div class="loader-section" style="background-color: rgba(255, 255, 255, 0.4);background: rgba(255, 255, 255, 0.4);color: rgba(255, 255, 255, 0.4);display: none;height: 100%;position: fixed;top: 0;width: 100%;z-index: 9999;display: block;height: 100%;position: fixed;top: 0;width: 100%;z-index: 9999;"><img style="opacity: 1 !important;position: fixed;top: 50%;" src="images/loader.gif" alt="LOADING..."><br></div>',
        link: function (rootScope, element, attr) {
            rootScope.$watch('isLoading', function (val) {
                 if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
});
app.directive('loadingPage', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div class="loader-section-page" style="background-color: rgba(255, 255, 255, 0.79);background: rgba(255, 255, 255, 0.4);color: rgba(255, 255, 255, 1);opacity:1;display: none;height: 100%;position: fixed;top: 0;width: 100%;z-index: 9999;display: block;height: 100%;position: fixed;top: 0;width: 100%;z-index: 9999;"><div class="loader-internal"><img style="opacity: 1 !important;position: fixed;top: 50%; left: 50%;" src="images/angular-loader.gif" alt="LOADING..."></div></div>',
        link: function (rootScope, element, attr) {
            rootScope.$watch('isLoadingPage', function (val) {
                 if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
});
app.directive('biodataLoading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div class="biodata-auto-saved"><img alt="" src="images/loader.gif"><br>Auto Saved</div>',
        link: function (rootScope, element, attr) {
            rootScope.$watch('isLoadingBiodata', function (val) {
                 if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
});
// override the default input to update on blur
app.directive('ngModelOnblur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: 1, // needed for angular 1.2.x
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;
            elm.unbind('input').unbind('keydown').unbind('change');
                elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });         
            });
        }
    };
});

/* It stores the value on focus, and compares it to the new value on blur, if changed, it triggers the expression in the attribute. */
app.directive('changeOnBlur', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attrs, ngModelCtrl) {
                    if (attrs.type === 'radio' || attrs.type === 'checkbox') 
                        return;

                    var expressionToCall = attrs.changeOnBlur;

                    var oldValue = null;
                    elm.bind('focus',function() {
                        scope.$apply(function() {
                            oldValue = elm.val();
                            console.log(oldValue);
                        });
                    })
                    elm.bind('blur', function() {
                        scope.$apply(function() {
                            var newValue = elm.val();
                            console.log(newValue);
                            if (newValue !== oldValue){
                                scope.$eval(expressionToCall);
                            }
                                //alert('changed ' + oldValue);
                        });         
                    });
                }
            };
        });

app.directive('ebdFocus', ['$parse', function($parse) {
  return function(scope, element, attr) {
    var fn = $parse(attr['ebdFocus']);
    element.bind('focus', function(event) {
        setTimeout(function(){
          scope.$apply(function() {
            fn(scope, {$event:event});
          });
        },300);
    });
  }
}]);
app.directive('ebdBlur', ['$parse', function($parse) {
  return function(scope, element, attr) {
    //setTimetout(function(){
        var fn = $parse(attr['ebdBlur']);
        element.bind('blur', function(event) {
          setTimeout(function(){
            scope.$apply(function() {
                fn(scope, {$event:event});
              });
            element.focusout();
            //console.log('focus out');
          },200);
        });
    //},300);
  }
}]);
angular.module('easybiodata').directive('confirmationClick', ['$uibModal',
    function($uibModal) {
      return {
        restrict: 'A',
        scope:{
          confirmationClick:"&",
          item:"="
        },
        link: function(scope, element, attrs) {
          element.bind('click', function() {
            scope.confirmationMessage = attrs.confirmationClickMessage || "Are you sure ?";
            var modalInstance = $uibModal.open({
              templateUrl: 'modals/confirmation.html',
              scope: scope,
              size: 'sm',
              controller: function($scope, $uibModalInstance) {
                    $scope.confirmOk = function() {
                      $uibModalInstance.close();
                    };
                    $scope.confirmCancel = function() {
                      $uibModalInstance.dismiss('cancel');
                    };
                  },
            });
            modalInstance.result.then(function() {
              scope.confirmationClick({item:scope.item}); //raise an error : $digest already in progress
            }, function() {
              //Modal dismissed
            });
            //*/
          });
        }
      }
    }
]);
app.directive("compareToEmails", function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {
                 
                ngModel.$validators.compareToEmails = function(modelValue) {
                    //console.log(scope.otherModelValue);
                    /*console.log('comparing '+modelValue+" and "+scope.otherModelValue+" and comparison is: "+(modelValue == scope.otherModelValue));*/
                    return modelValue == scope.otherModelValue;
                };
                scope.$watch("otherModelValue", function() {
                    /*console.log('compared');*/
                    ngModel.$validate();
                });
            }
        };
    });
/* directive to detect click outside the popup div for create biodata tab popups */
app.directive('clickOutside', ['$document', '$parse', '$timeout', clickOutside]);
    function clickOutside($document, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, elem, attr) {
                // postpone linking to next digest to allow for unique id generation
                $timeout(function() {
                    var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.split(/[ ,]+/) : [],
                        fn;
                    // add the elements id so it is not counted in the click listening
                    if (attr.id !== undefined) {
                        classList.push(attr.id);
                    }
                    function eventHandler(e) {
                        //console.log(angular.element(elem).hasClass("ng-hide"));
                        var i,
                            element,
                            r,
                            id,
                            classNames,
                            l;
                        // check if our element already hidden and abort if so
                        if (angular.element(elem).hasClass("ng-hide")) {
                            return;
                        }
                        // if there is no click target, no point going on
                        if (!e || !e.target) {
                            return;
                        }
                        // loop through the available elements, looking for classes in the class list that might match and so will eat
                        for (element = e.target; element; element = element.parentNode) {
                            id = element.id,
                            classNames = element.className;

                            l = classList.length                            // Unwrap SVGAnimatedString classes
                            if (classNames && classNames.baseVal !== undefined) {
                                classNames = classNames.baseVal;
                            }
                            // if there are no class names on the element clicked, skip the check
                            if (classNames || id) {
                                // console.log('classNames: ' + classNames);
                                // loop through the elements id's and classnames looking for exceptions
                                for (i = 0; i < l; i++) {
                                    //prepare regex for class word matching
                                    r = new RegExp('\\b' + classList[i] + '\\b');
                                  //  console.log('classList: ' + classList[i]);
                                    // check for exact matches on id's or classes, but only if they exist in the first place
                                    if ((id !== undefined && id === classList[i]) || (classNames && r.test(classNames))) {
                                        // now let's exit out as it is an element that has been defined as being ignored for clicking outside
                                        return;
                                    }
                                }
                            }
                        }
                        // if we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
                        $scope.$apply(function() {
                            fn = $parse(attr['clickOutside']);
                            fn($scope);
                        });
                    }
                    // if the devices has a touchscreen, listen for this event
                    if (_hasTouch()) {
                        $document.on('touchstart', eventHandler);
                    }
                    // still listen for the click event even if there is touch to cater for touchscreen laptops
                    $document.on('click', eventHandler);
                    // when the scope is destroyed, clean up the documents event handlers as we don't want it hanging around
                    $scope.$on('$destroy', function() {
                        if (_hasTouch()) {
                            $document.off('touchstart', eventHandler);
                        }
                        $document.off('click', eventHandler);
                    });
                    // private function to attempt to figure out if we are on a touch device
                    function _hasTouch() {
                        // works on most browsers, IE10/11 and Surface
                        return 'ontouchstart' in window || navigator.maxTouchPoints;
                    };
                });
            }
        };
    }
/* directive to detect click outside the popup div for create biodata tab popups */
/* tabs directive for edit create biodata mobile page */
    app.directive('ngTabs', ngTabsDirective);
    function ngTabsDirective() {
        return {
            scope: true,
            restrict: 'EAC',
            controller: ngTabsController
        };
    }
    function ngTabsController($scope) {
        $scope.tabs = {
            index: 0,
            count: 0
        };

        this.headIndex = 0;
        this.bodyIndex = 0;

        this.getTabHeadIndex = function () {
            return $scope.tabs.count = ++this.headIndex;
        };

        this.getTabBodyIndex = function () {
            return ++this.bodyIndex;
        };
    }
    ngTabsController.$inject = ['$scope'];
    app.directive('ngTabHead', ngTabHeadDirective);
    function ngTabHeadDirective() {
        return {
            scope: false,
            restrict: 'EAC',
            require: '^ngTabs',
            link: function (scope, element, attributes, controller) {
                var index = controller.getTabHeadIndex();
                var value = attributes.ngTabHead;
                var active = /[-*\/%^=!<>&|]/.test(value) ? scope.$eval(value) : !!value;

                scope.tabs.index = scope.tabs.index || ( active ? index : null );

                element.bind('click', function () {
                    scope.tabs.index = index;
                    scope.$$phase || scope.$apply();
                });

                scope.$watch('tabs.index', function () {
                    element.toggleClass('active', scope.tabs.index === index);
                });
            }
        };
    }
   app.directive('ngTabBody', ngTabBodyDirective);
    function ngTabBodyDirective() {
        return {
            scope: false,
            restrict: 'EAC',
            require: '^ngTabs',
            link: function (scope, element, attributes, controller) {
                var index = controller.getTabBodyIndex();
                scope.$watch('tabs.index', function () {
                    element.toggleClass(attributes.ngTabBody + ' active', scope.tabs.index === index);
                });
            }
        };
    }
    /* end of createbiodata mobile tabs directives */
})();