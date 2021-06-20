import { environment } from "src/environments/environment";

export default {
    oidc: {
        clientId: '0oa114wxz2KVnOMuS5d7',
        issuer: 'https://dev-80749159.okta.com/oauth2/default',
        redirectUri: `${environment.restUrl}/login/callback`,
        scopes: ['openid', 'profile', 'email']
    }

}
