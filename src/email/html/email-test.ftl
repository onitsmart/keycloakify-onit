<#--
  This file has been claimed for ownership from @keycloakify/email-native version 260007.0.0.
  To relinquish ownership and restore this file to its original content, run the following command:
  
  $ npx keycloakify own --path "email/html/email-test.ftl" --revert
-->

<#import "template.ftl" as layout>
<#assign emailSubject = msg("emailTestSubject", realmName) >

<#assign themeLogoUrl = url.resourcesUrl + "/" + msg("logoAssetName", realmName)>
<#--  <#assign themeLogoUrl = "${url.resourcesUrl}/${msg("logoAssetName", realmName)}">  -->

<@layout.emailLayout subject=emailSubject logoUrl=themeLogoUrl>
${kcSanitize(msg("emailTestBodyHtml", realmName))?no_esc}
<hr/>
<span>theme name: ${xKeycloakify.themeName}</span>
<hr/>
<span>subject: ${msg("emailTestSubject", xKeycloakify.themeName)}</span>
<hr />
<strong>themeLogoUrl: ${themeLogoUrl}</strong><br/>
<span>msg only: ${msg("logoAssetName", realmName)}</span><br/>
<span>with kcSanitize: ${kcSanitize(msg("logoAssetName", realmName))?no_esc}</span><br/>
</@layout.emailLayout>
