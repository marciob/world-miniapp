import NextAuth, { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
	providers: [
		{
			id: 'worldcoin',
			name: 'Worldcoin',
			type: 'oauth',
			wellKnown: 'https://id.worldcoin.org/.well-known/openid-configuration',
			authorization: { params: { scope: 'openid' } },
			clientId: process.env.WLD_CLIENT_ID,
			clientSecret: process.env.WLD_CLIENT_SECRET,
			idToken: true,
			checks: ['pkce', 'state', 'nonce'],
			profile(profile) {
				console.log('Profile received:', profile)
				return {
					id: profile.sub,
					name: profile.sub,
					verificationLevel: profile['https://id.worldcoin.org/v1']?.verification_level,
				}
			},
		},
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log('Sign In Callback:', { user, account, profile, email, credentials })
			return true
		},
		async redirect({ url, baseUrl }) {
			console.log('Redirect Callback:', { url, baseUrl })
			return url.startsWith(baseUrl) ? url : baseUrl
		},
		async session({ session, user, token }) {
			console.log('Session Callback:', { session, user, token })
			if (session.user) {
				session.user.verificationLevel = token.verificationLevel as string
			}
			return session
		},
		async jwt({ token, user, account, profile }) {
			console.log('JWT Callback:', { token, user, account, profile })
			if (account) {
				token.verificationLevel = account.verification_level as string | undefined
			}
			return token
		},
	},
	events: {
		async signIn(message) {
			console.log('Sign In Event:', message)
		},
		async signOut(message) {
			console.log('Sign Out Event:', message)
		},
		async createUser(message) {
			console.log('Create User Event:', message)
		},
		async linkAccount(message) {
			console.log('Link Account Event:', message)
		},
		async session(message) {
			console.log('Session Event:', message)
		},
	},
	debug: true,
	logger: {
		error(code, ...message) {
			console.error('NextAuth Error:', code, message)
		},
		warn(code, ...message) {
			console.warn('NextAuth Warning:', code, message)
		},
		debug(code, ...message) {
			console.debug('NextAuth Debug:', code, message)
		},
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
