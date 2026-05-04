<#--
  This file has been claimed for ownership from @keycloakify/email-native version 260007.0.0.
  To relinquish ownership and restore this file to its original content, run the following command:
  
  $ npx keycloakify own --path "email/html/password-reset.ftl" --revert
-->

<#import "template.ftl" as layout>
<@layout.subject>
${kcSanitize(msg("passwordResetSubject",realmName))?no_esc}
</@layout.subject>
<@layout.logoUrl>
"${url.resourcesUrl}/${kcSanitize(msg("logoAssetName",realmName))?no_esc}"
</@layout.logoUrl>
<@layout.emailLayout>
${kcSanitize(msg("passwordResetBodyHtml",link, linkExpiration, realmName, linkExpirationFormatter(linkExpiration)))?no_esc}
</@layout.emailLayout>
