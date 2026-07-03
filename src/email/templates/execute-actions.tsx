import { GetSubject, GetTemplate, GetTemplateProps  } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import * as Fm from "keycloakify-emails/jsx-email";
import { ReactNode } from "react";
import { render, Raw, Container } from "jsx-email";
import { EmailLayout } from "../layout";
import { formatMessage, getMessages } from "../i18n";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "it",
  themeName: "onit",
};

export const templateName = "Execute Actions";

// Helper component to create a Freemarker expression for the list
const FmList = (props: { value: string; itemAs: string; children: ReactNode }) => (
  <>
    <Fm.Tag name="list" attributes={props.value}>
      <Fm.Tag name="items" attributes={`as ${props.itemAs}`}>
        {props.children}
      </Fm.Tag>
    </Fm.Tag>
  </>
);

const { exp } = createVariablesHelper("executeActions.ftl");

export const Template = ({ locale, themeName } : TemplateProps) => {
  const messages = getMessages({ locale, themeName });
  return (
    <EmailLayout locale={locale} emailSubject={messages["executeActionsSubject"]} themeName={themeName}>
      <Container>
        <Raw content={formatMessage(
            messages["executeActionsBodyHtml_pt1"],
            exp("realmName")
        )} />
        <Fm.If condition="requiredActions??">
        <ul>
          <FmList value="requiredActions" itemAs="reqActionItem">
            <li>
              <Fm.If condition={`reqActionItem == 'UPDATE_PASSWORD'`}>
                {messages["requiredAction.UPDATE_PASSWORD"]}
              </Fm.If>
              <Fm.If condition={`reqActionItem == 'UPDATE_PROFILE'`}>
                {messages["requiredAction.UPDATE_PROFILE"]}
              </Fm.If>
              <Fm.If condition={`reqActionItem == 'TERMS_AND_CONDITIONS'`}>
                {messages["requiredAction.TERMS_AND_CONDITIONS"]}
              </Fm.If>
              <Fm.If condition={`reqActionItem == 'CONFIGURE_TOTP'`}>{messages["requiredAction.CONFIGURE_TOTP"]}</Fm.If>
              <Fm.If condition={`reqActionItem == 'VERIFY_EMAIL'`}>{messages["requiredAction.VERIFY_EMAIL"]}</Fm.If>
              <Fm.If condition={`reqActionItem == 'CONFIGURE_RECOVERY_AUTHN_CODES'`}>
                {messages["requiredAction.CONFIGURE_RECOVERY_AUTHN_CODES"]}
              </Fm.If>
            </li>
          </FmList>
        </ul>
      </Fm.If>
        <Raw content={formatMessage(
            messages["executeActionsBodyHtml_pt2"],
            exp("link"),
            exp("linkExpirationFormatter(linkExpiration)"),
        )} />
      </Container>
    </EmailLayout>
  );
};

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (props) => {
  const messages = getMessages({ locale: props.locale, themeName: props.themeName });
  return messages["executeActionsSubject"];
};