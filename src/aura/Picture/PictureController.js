({  
    // Load current picture
    onInit: function(component) {
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
            }
        });
        $A.enqueueAction(action); 
    },
    
    onDragOver: function(component, event) {
        event.preventDefault();
    },

    onDrop: function(component, event, helper) {
		event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        var files = event.dataTransfer.files;
        if (files.length>1) {
            return alert("You can only upload one picture");
        }
        helper.readFile(component, helper, files[0]);
	},
    
    // this function automatic call by aura:waiting event  
    showSpinner: function(component, event, helper) {
       // make Spinner attribute true for display loading spinner 
        component.set("v.Spinner", true); 
   },
    
 	// this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
     // make Spinner attribute to false for hide loading spinner    
       component.set("v.Spinner", false);
    },
    
    delete : function(component, event, helper){
    	var action = component.get("c.deletePicture"); 
        action.setParams({
            parentId: component.get("v.recordId"),
        });
        action.setCallback(this, function(a) {
            component.set('v.pictureSrc', 'https://s3-us-west-1.amazonaws.com/sfdc-demo/image-placeholder.png');
            component.set('v.message', 'Drag a picture here');
            component.set("v.hasPicture", "false");
        });
        $A.enqueueAction(action); 
	},
    
})