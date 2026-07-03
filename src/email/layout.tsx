import { Body, Head, Html, Img, Preview } from "jsx-email";
import type { PropsWithChildren } from "react";
import { getMessages } from "./i18n";

const headCss = `
    @media all {
      .btn-primary table td:hover {
        background-color: #022861 !important;
      }

      .btn-primary a:hover {
        background-color: #022861 !important;
        border-color: #022861 !important;
      }
    }
    
    @media only screen and (max-width: 640px) {

      .main p,
      .main td,
      .main span {
        font-size: 16px !important;
      }

      .wrapper {
        padding: 8px !important;
      }

      .content {
        padding: 0 !important;
      }

      .container {
        padding: 0 !important;
        padding-top: 8px !important;
        width: 100% !important;
      }

      .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
      }

      .btn table {
        max-width: 100% !important;
        width: 100% !important;
      }

      .btn a {
        font-size: 16px !important;
        max-width: 100% !important;
        width: 100% !important;
      }
    }

    @media all {
      .ExternalClass {
        width: 100%;
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }

      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
    }
`;

const bodyStyle = {
  fontFamily: "Helvetica, sans-serif",
  WebkitFontSmoothing: "antialiased",
  fontSize: "16px",
  lineHeight: "1.3",
  msTextSizeAdjust: "100%",
  webKitTextSizeAdjust: "100%",
  backgroundColor: "#f4f5f6",
  margin: "0",
  padding: "0",
};

const baseUrl = import.meta.isJsxEmailPreview 
    ? "../assets"
    : "${url.resourcesUrl}";

export const EmailLayout = ({
  locale,
  emailSubject,
  themeName,
  children,
}: PropsWithChildren<{ locale: string; emailSubject: string; themeName: string }>) => {
  const messages = getMessages({ locale, themeName });
  const logoUrl = `${baseUrl}/${messages["logo"]}`;
  return (
    <Html lang={locale}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
        <title>{ emailSubject }</title>
        <style media="all" type="text/css" dangerouslySetInnerHTML={{ __html: headCss }} />
      </Head>

      <Preview>Preview text</Preview>

      <Body style={bodyStyle}>
        <table role="presentation" className="body" border={0} cellPadding={0} cellSpacing={0}
            style={{ borderCollapse: "separate", backgroundColor: "#f4f5f6", width: "100%" }}
            width="100%" bgcolor="#f4f5f6">
            <tr>
                <td style={{ fontFamily: "Helvetica, sans-serif", fontSize: "16px", verticalAlign: "top" }} valign="top">&nbsp;</td>
                <td className="container"
                    style={{ fontFamily: "Helvetica, sans-serif", fontSize: "16px", verticalAlign: "top", maxWidth: "600px", padding: "0", paddingTop: "24px", width: "600px", margin: "0 auto" }} 
                    width="600" valign="top">
                    <div className="content"
                        style={{boxSizing: "border-box", display: "block", margin: "0 auto", maxWidth: "600px", padding: "0"}}>
                        <table role="presentation" className="main" border={0} cellPadding={0} cellSpacing={0}
                            style={{borderCollapse: "separate", background: "#ffffff", border: "1px solid #eaebed", borderRadius: "16px", width: "100%"}}
                            width="100%">
                            <tr>
                                <td className="wrapper"
                                    style={{ fontFamily: "Helvetica, sans-serif", fontSize: "16px", verticalAlign: "top", boxSizing: "border-box", padding: "24px" }}
                                    valign="top">
                                    <Img src={logoUrl} alt="logo" width="80" height="40" style={{ border: "0", outline: "none", textDecoration: "none", display: "block" }} />
                                </td>
                            </tr>

                            {/* START MAIN CONTENT AREA  */}

                            <tr>
                                <td className="wrapper"
                                    style={{ fontFamily: "Helvetica, sans-serif", fontSize: "16px", verticalAlign: "top", boxSizing: "border-box", padding: "24px" }} 
                                    valign="top">
                                    {children}
                                </td>
                            </tr>

                            {/* END MAIN CONTENT AREA  */}  
                        </table>

                        {/* START FOOTER  */}
                        <div className="footer" style={{ clear: "both", paddingTop: "24px", paddingBottom: "12px", textAlign: "center", width: "100%" }}>
                            <table role="presentation" border={0} cellPadding={0} cellSpacing={0} style={{ borderCollapse: "separate", width: "100%" }}>
                            <tr>
                                <td className="content-block"
                                    style={{ fontFamily: "Helvetica, sans-serif", verticalAlign: "top", color: "#9a9ea6", fontSize: "16px", textAlign: "center" }}
                                    valign="top" align="center">
                                    <span className="apple-link" 
                                        style={{ color: "#9a9ea6", fontSize: "12px", textAlign: "center" }}>
                                        Onit Operations S.r.l.<br />
                                        Via dell'Arrigoni, 198 • 47522 Cesena (FC) IT<br />
                                        Partita IVA 04808840401
                                    </span>
                                    <br/><br/>
                                    <span>
                                        <a href="https://onit.it/it/legal/informativa-privacy" style={{ textDecoration: "underline", color: "#9a9ea6", fontSize: "16px", textAlign: "center" }}>
                                          Privacy &amp; cookie policy
                                        </a>
                                    </span>
                                </td>
                            </tr>
                            </table>
                        </div>
                        {/* END FOOTER  */}

                        {/* END CENTERED WHITE CONTAINER  */}
                    </div>
                </td>
                <td style={{ fontFamily: "Helvetica, sans-serif", fontSize: "16px", verticalAlign: "top" }} valign="top">&nbsp;</td>
            </tr>
        </table>
      </Body>
    </Html>
  );
};