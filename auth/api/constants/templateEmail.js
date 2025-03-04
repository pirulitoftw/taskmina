module.exports = {
    standard: (color, titleHeader, title, message) => {
        return `
        <!DOCTYPE html>
        <html>
        
        <head>
            <meta charset='utf-8'>
            <title></title>
        </head>
        
        <body>
            <center>
                <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" heigth="auto" style="max-width: 600px;
                         background-color: rgb(255, 255, 255); border: 1px solid rgb(228, 226, 226);
                          border-collapse: separate !important; border-radius: 4px; border-spacing: 0px; 
                          color: rgb(36, 33, 40); margin: 0px; padding: 40px;">
                    <tbody>
                        <tr>
                            <td align="left" valign="center"
                                style="padding-bottom: 40px; border-top: 0px; height: 100% !important; width: 100% !important;">
                                <h2 style="color: ${color}">
                                    ${titleHeader}
                                </h2>
                            </td>
                            <td align="right" valign="center"
                                style="padding-bottom: 40px; border-top: 0px; height: 100% !important; width: 100% !important;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-top: 10px; border-top: 1px solid rgb(228, 226, 226);">
                                <h3 style="color: rgb(48, 48, 48); font-size: 18px; line-height: 1.6; font-weight: 500;">
                                    ${title}
                                    </h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
            
            </center>
        </body>
        
        </html>
        `
    }
}