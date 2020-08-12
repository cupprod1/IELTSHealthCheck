var actions = require("./../lib/browserAction.js");
var format = require("string-template");

module.exports = {
    elements: {
        login_input:{
            selector:'#okta-signin-username'
        },
        login_password:{
            selector:'#okta-signin-password'
        },
        signin_submit:{
            selector:'#okta-signin-submit'
        },
        s_question:{
          selector: '[name="answer"]'
        },
        verify_btn:{
            selector:'input[value="Verify"]'
        },
        search:{
            selector:'[qid="sad-1"]'
        },
        searchbtn:{
            selector:'[qid="sad-3"]'
        },
        adminmenu:{
            selector:'.admin-menu ul'
        }
    },
    commands: [
        {
            waitForOktalogin:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.login_input.selector,50000);
                actions.setValue(this,this.elements.login_input.selector,'mmehta');
                actions.setValue(this,this.elements.login_password.selector,'4LSCudaypark#2');
                actions.waitForElementVisible(this,this.elements.signin_submit.selector,50000);
                actions.click(this,this.elements.signin_submit.selector);
                actions.waitForElementVisible(this,this.elements.s_question.selector,50000);
                actions.setValue(this,this.elements.s_question.selector,'bhiwani');
                actions.waitForElementVisible(this,this.elements.verify_btn.selector,50000);
                actions.click(this,this.elements.verify_btn.selector);
                this.api.pause(10000);
            },
            waitForSearchBox:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.search.selector,50000);
                actions.setValue(this,this.elements.search.selector,'a');
                actions.waitForElementVisible(this,this.elements.searchbtn.selector,50000);
                actions.click(this,this.elements.searchbtn.selector);
                actions.waitForElementVisible(this,this.elements.adminmenu.selector,50000);
            },
            waitForSearchBoxAndGetAllInstitutes:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.search.selector,50000);
                actions.setValue(this,this.elements.search.selector,' ');
                actions.waitForElementVisible(this,this.elements.searchbtn.selector,50000);
                actions.click(this,this.elements.searchbtn.selector);
                actions.waitForElementVisible(this,this.elements.adminmenu.selector,50000);                  
            },
            getSchoolCount:function(cb) {
                actions.waitForElementVisible(this,'.header h2',50000);
                actions.getElementText(this,'.header h2',cb);
            },
            getDetails:function(br,limit) {
                var self=this;
                this.api.useCss();
                for(let k=2;k<=limit+1;k++) {
                let str="";
                actions.waitForElementVisible(this,'.list-container .list-items:nth-of-type('+k+') .row .col-12:nth-of-type(1) .detail',50000);
                actions.getElementText(this,'.list-container .list-items:nth-of-type('+k+') .row .col-12:nth-of-type(1) .detail',function(school) {
                    str+=school+",";                 
                }); 
                actions.getElementText(this,'.list-container .list-items:nth-of-type('+k+') .row .col-12:nth-of-type(2) .detail',function(key) {
                   str+=key+",";
                });
                actions.getElementText(this,'.list-container .list-items:nth-of-type('+k+') .row .col-12:nth-of-type(3) .detail',function(location) {
                    str+=location+",";
                });
                actions.getElementText(this,'.list-container .list-items:nth-of-type('+k+') .row .col-12:nth-of-type(4) .detail',function(country) {
                    str+=country+",";
                    actions.click(self,'.list-container .list-items:nth-of-type('+k+') .row .col-12:nth-of-type(1) .detail');
                    self.api.pause(10000);
                    br.window_handles(function(result) {
                        br.switchWindow(result.value[1]);
                        actions.waitForElementVisible(self,'.nav-pills.mr-auto li:nth-of-type(2) a span:nth-of-type(2)',50000);
                        actions.getElementText(self,'.nav-pills.mr-auto li:nth-of-type(2) a span:nth-of-type(2)',function(student) {
                            student=student.substring(1, student.length-1);
                            str+=student+",";                 
                        }); 
                        actions.getElementText(self,'.nav-pills.mr-auto li:nth-of-type(3) a span:nth-of-type(2)',function(teacher) {
                            teacher=teacher.substring(1, teacher.length-1);
                            str+=teacher+",";
                        });
                        actions.getElementText(self,'.nav-pills.mr-auto li:nth-of-type(4) a span:nth-of-type(2)',function(admin) {
                            admin=admin.substring(1, admin.length-1);
                            str+=admin+",";
                            console.log(str);
                            br.closeWindow();
                            self.api.pause(1000);
                            br.switchWindow(result.value[0]);
                        });                        
                    });                  
                });
             }    
            }
        }
    ]
};
