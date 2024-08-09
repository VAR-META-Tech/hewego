export function createPartnerShip(request, data) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your account has been created on our platform.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to notify you that your account has been created on our platform. You can login now.</p>    
                    <p>username: ${data.username}</p>
                    <p>password: ${data.password}</p>
                    <p>Please find your project Client ID and secret below for connecting to our backend server.</p>
                    <p>client id: ${data.clientId}</p>
                    <p>client secret: ${data.clientSecret}</p>
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}

export function createSuperAdmin(request, data) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your account has been created on our platform.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to notify you that your account has been created on our platform. You can login now.</p>    
                    <p>username: ${data.username}</p>
                    <p>password: ${data.password}</p>
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}

export function updateClientSecret(request, data) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your Client Secret has been updated.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to inform you that your account's client secret has been updated on the platform. Please find your latest secret below for your api connection</p>    
                    <p>New client secret: ${data.newClientSecret}</p>   
                    <p>Reminder : Please do not disclose sensative information outside the party.</p>
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}

export function resetPassword(request, url) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            .button{
                padding: 15px 45px;
                background-color: #3399cc;
                color: #fff;
                border: none;
            }
            .button:hover {
                cursor: pointer;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your password has been reset.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to inform you that your password has been reset. Please click the button below to set a new password.</p>    
                    <table border="0" cellpadding="0" cellspacing="0" style="background-color:#766fca; border-radius:5px; margin-left:auto; margin-right:auto;">
                        <tr>
                            <td align="center" valign="middle" style="color:#FFFFFF; font-family:Helvetica, Arial, sans-serif; font-size:16px; font-weight:bold; padding-top:15px; padding-bottom:15px;">
                                <a href="` + url + `" target="_blank" style="color:#FFFFFF; text-decoration:none; padding: 19px 45px;">Reset password</a>
                            </td>
                        </tr>
                    </table>
                    <p>If you are unable to click the link above, copy and paste this URL into your browser:</p>
                    <a>` + url + `</a>
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}

export function updateStatus(request, data, url, statusHeader, status) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your account has been ` + statusHeader + `.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to inform you that your account has been ` + status + ` on our platfrom.</p>    
                    <p>Reason: ${data.reason}</p>
                    <p>Please reach out to ` + url + ` should you have any enquiry.</p>
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}

export function backStatus(request, statusHeader, status) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your account has been ` + statusHeader + `.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to inform you that your account has been ` + status + ` from the platfrom.</p>  
                    <p>You can login again.</p>  
                    <p>Apologies for any inconvenience caused.</p>                       
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html

}

export function createApiKey(key) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your Project API Key.</h1>
                    <p>We would like to inform you that your API key. Please do not disclose to anyone outside the project party</p>    
                    <strong>` + key + `</strong>
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}

export function updateStatusOfCollection(request, data, url, status, linkCollection) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your collection delisted.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to inform you that your listing has been ` + status + ` on our platfrom.</p> 
                    <p>` + linkCollection + `</p>   
                    <p>Reason: ${data.reason}</p>
                    <p>Please reach out to ` + url + ` should you have any enquiry.</p>
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}

export function updateStatusOfGameInfo(request, data, url, status, linkGame) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your game deleted.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to inform you that your game has been ` + status + ` on our platfrom.</p> 
                    <p>` + linkGame + `</p>   
                    <p>Reason: ${data.reason}</p>
                    <p>Please reach out to ` + url + ` should you have any enquiry.</p>
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}

export function updateStatusOfToken(request, data, url, status, linkToken) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your token deactivated.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to inform you that your token has been ` + status + ` on our platfrom.</p> 
                    <p>` + linkToken + `</p>   
                    <p>Reason: ${data.reason}</p>
                    <p>Please reach out to ` + url + ` should you have any enquiry.</p>
                    <p>Thank you,</p>
                    <p>PolkaFantasy Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}

export function notifyNewPassword(request, newPassword) {
    const html =
        `<meta charset = "UTF-8">
    <head>
        <style>
            .container{
                width: 50%;
                backgroung-color: #DDDDDD;
            }
            .button{
                padding: 15px 45px;
                background-color: #3399cc;
                color: #fff;
                border: none;
            }
            .button:hover {
                cursor: pointer;
            }
            @media screen and (max-width: 1500px) {
                .container{
                    width: 100%;
                    backgroung-color: #DDDDDD;
                }
            }
        </style>
    </head>
    <body>
        <div style='min-height: max-content;'>
            <div class="container">                   
                <p style='line-height: 40px;width: 100%;text-align: center; background-color: #EEEEEE; margin: 0;'>*** This is an automatically generated email, please do not reply ***</p>
                <div style='padding: 2% 15% 2% 15%; background-color: #fff; color: #000 !important;'>
                    <h1 style='text-align: center;'>Your password has been reset.</h1>
                    <p>Dear ${request.username}</p>
                    <p>We would like to inform you that your password has been auto reset. New password for your account: <b>${newPassword}</b>.</p>    
                    <p>Dont give anyone this password. Maybe this password is so hard for you to remember, so that you can change your password later.</p>    
                    <p>Thank you,</p>
                    <p>HEDERA DAO Team</p>
                </div> 
            </div>
        </div>
    </body>`;
    return html
}