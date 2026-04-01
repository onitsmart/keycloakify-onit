<#--
  This file has been claimed for ownership from @keycloakify/email-native version 260007.0.0.
  To relinquish ownership and restore this file to its original content, run the following command:
  
  $ npx keycloakify own --path "email/html/template.ftl" --revert
-->

<#macro emailLayout>
<html>
<style type="text/css">
  header {
    display: flex;
    align-items: center;
  }
    header .logo {
      height: 24px;
      width: auto;
    }
</style>
<body>
    <header>
      <img 
        alt="Onit logo"
        src="${url.resourcesUrl}/company-logo.svg" />
    </header>
    <#nested>
</body>
</html>
</#macro>
