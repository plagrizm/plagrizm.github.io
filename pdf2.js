module.exports = function redactPDF({
    filePath,
    patterns
}) {
    filePath='tst.pdf'
    const modPdfWriter = hummus.createWriterToModify(filePath, {
        modifiedFilePath: `${filePath}-modified`,
        compress: false
    })
    const numPages = modPdfWriter.createPDFCopyingContextForModifiedFile().getSourceDocumentParser().getPagesCount()

    for (let page = 0; page < numPages; page++) {
        const copyingContext = modPdfWriter.createPDFCopyingContextForModifiedFile()
        const objectsContext = modPdfWriter.getObjectsContext()

        const pageObject = copyingContext.getSourceDocumentParser().parsePage(page)
        const textStream = copyingContext.getSourceDocumentParser().queryDictionaryObject(pageObject.getDictionary(), 'Contents')
        const textObjectID = pageObject.getDictionary().toJSObject().Contents.getObjectID()

        let data = []
        const readStream = copyingContext.getSourceDocumentParser().startReadingFromStream(textStream)
        while (readStream.notEnded()) {
            const readData = readStream.read(10000)
            data = data.concat(readData)
        }

        const pdfPageAsString = Buffer.from(data).toString()

       /* let toRedactString = findInText({
            patterns,
            string: pdfPageAsString
        })*/

        //const redactedPdfPageAsString = pdfPageAsString.replace(new RegExp(toRedactString, 'g'), new Array(toRedactString.length).join('-'))
        const redactedPdfPageAsString = pdfPageAsString.replace(/a/g, 'g')

        // Create what will become our new text object
        objectsContext.startModifiedIndirectObject(textObjectID)

        const stream = objectsContext.startUnfilteredPDFStream()
        stream.getWriteStream().write(strToByteArray(redactedPdfPageAsString))
        objectsContext.endPDFStream(stream)

        objectsContext.endIndirectObject()
    }

    modPdfWriter.end()

    hummus.recrypt(`${filePath}-modified`, filePath)
}

function findInText({
    patterns,
    string
}) {
    for (let pattern of patterns) {
        const match = new RegExp(pattern, 'g').exec(string)
        if (match) {
            if (match[1]) {
                return match[1]
            } else {
                return match[0]
            }
        }
    }

    return false
}

function strToByteArray(str) {
    let myBuffer = []
    let buffer = Buffer.from(str)
    for (let i = 0; i < buffer.length; i++) {
        myBuffer.push(buffer[i])
    }
    return myBuffer
}