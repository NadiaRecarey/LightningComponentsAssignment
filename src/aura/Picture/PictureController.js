({  
    // Load current picture
    onInit: function(component) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");

        var action = component.get("c.getPicture"); 
        action.setParams({
            parentId: component.get("v.recordId"),
        });
        action.setCallback(this, function(a) {
            var attachment = a.getReturnValue();
            console.log(attachment);
            if (attachment && attachment.Id) {
	            component.set('v.pictureSrc', '/servlet/servlet.FileDownload?file=' 
                                                  + attachment.Id);
                component.set("v.hasPicture", "true");
            }else{ 
                component.set("v.hasPicture", "false");
            }       
            $A.util.addClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action); 
    },
    
    onDragOver: function(component, event) {
        event.preventDefault();
    },

    onDrop: function(component, event, helper) {
        helper.delete(component, helper);
		event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        var files = event.dataTransfer.files;
        if (files.length>1) {
            return alert("You can only upload one picture");
        }
        helper.readFile(component, helper, files[0]);
        var spinner = component.find("spinner");
	},
    
    delete : function(component, event, helper){
    	helper.delete(component, helper);
	},
    
})