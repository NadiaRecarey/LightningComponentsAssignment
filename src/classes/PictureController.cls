public with sharing class PictureController {
    
    @AuraEnabled
    public static Attachment getPicture(Id parentId) {
 
        return [SELECT Id, Name, LastModifiedDate, ContentType FROM Attachment 
            WHERE parentid=:ParentId AND ContentType IN ('image/png', 'image/jpeg', 'image/gif') 
            ORDER BY LastModifiedDate DESC LIMIT 1];
    }
    
    @AuraEnabled
    public static Id saveAttachment(Id parentId, String fileName, String base64Data, String contentType) { 

        Attachment attachment = new Attachment();
        attachment.parentId = parentId;
        attachment.body = EncodingUtil.base64Decode(base64Data);
        attachment.name = fileName;
		attachment.contentType = contentType;
        insert attachment;
        return attachment.id;
    }
    
    @AuraEnabled
    public static boolean deletePicture(Id parentId) {
        boolean ret = false;
        try{ 
            Attachment a = [SELECT Id FROM Attachment WHERE parentid=:ParentId AND ContentType IN ('image/png', 'image/jpeg', 'image/gif') 
                    LIMIT 1];
            delete a;    
        }catch (DMLException dmle){
            System.debug('Unable to delete de picture, the following exception ocurred: ' + dmle.getDmlMessage(0));
        }
        return ret;
    }

}