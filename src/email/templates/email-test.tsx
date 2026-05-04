// emails/templates/email-test.tsx
import { GetSubject, GetTemplate, GetTemplateProps  } from "keycloakify-emails";
// import { createVariablesHelper } from "keycloakify-emails/variables";
import { EmailLayout } from "../layout";
import { render, Text, Container, Img } from "jsx-email";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const templateName = "Email Test";

// const { exp } = createVariablesHelper("email-test.ftl");

export const previewProps: TemplateProps = {
  locale: "it",
  themeName: "onit",
};

const baseUrl = import.meta.isJsxEmailPreview ? "/assets" : "${url.resourcesUrl}"

export const Template = ({ locale } : TemplateProps) => {
  return (
    <EmailLayout locale={locale} emailSubject="test email">
        <Container>
            <Text>This is a test message</Text>
        </Container>
        <Container>
            <Text>Logo image: </Text>
            <Img src={`${baseUrl}/onit-logo.png`} alt="Onit logo" width="200" />
            <Text>baseUrl: {baseUrl}</Text>
        </Container>
    </EmailLayout>
    );
}          

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "[KEYCLOAK] - SMTP test message";
};