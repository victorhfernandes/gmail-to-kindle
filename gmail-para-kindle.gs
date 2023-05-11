function setUpTrigger() {
    ScriptApp.newTrigger('emailToKindle')
        .timeBased()
        .everyMinutes(10)
        .create();
}

function emailToKindle() {

    const label = '<nomeLabel>';
    const kindleEmail = '<emailKindle>@kindle.com'

    const labelThreads = GmailApp.getUserLabelByName(label).getThreads();

    for (var i = 0; i < labelThreads.length; i++) {

        var messages = labelThreads[i].getMessages();

        if (labelThreads[i].isUnread() === true) {
            var contentFile = messages[0].getBody();
            var nameFile = messages[0].getSubject() + ".html";

            contentFile = convertImagesToBase64(contentFile);

            var htmlFile = Utilities.newBlob(contentFile, "text/html", nameFile);
            var pdfFile = DriveApp.createFile(htmlFile.getAs('application/pdf'));

            GmailApp.sendEmail(kindleEmail, ' ', ' ', {
                attachments: [pdfFile]
            });

            GmailApp.markThreadRead(labelThreads[i]);

            pdfFile.setTrashed(true);
        }
    }
}

function convertImagesToBase64(html) {

    var regex = /<img.*?src="(.*?)"/g;
    var matches = html.match(regex);

    for (var i = 0; i < matches.length; i++) {
        var imageUrl = matches[i].replace(/<img.*?src="/g, "").replace(/"/g, "");
        try {
            var imageBlob = UrlFetchApp.fetch(imageUrl).getBlob();

            var base64String = "data:" + imageBlob.getContentType() + ';base64, ' + Utilities.base64Encode(imageBlob.getBytes());

            html = html.replace(imageUrl, base64String);

        } catch (erro) {
        }
    }

    return html;
}
