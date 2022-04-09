import { Injectable } from '@nestjs/common';
import { TribeClient } from '@tribeplatform/gql-client';

@Injectable()
export class TribeService {
  async getGuestAccessToken() {
    const client = new TribeClient({
      graphqlUrl: 'https://app.tribe.so/graphql',
    });

    const guestTokens = await client.getTokens(
      { networkDomain: process.env.TRIBE_NETWORK_DOMAIN },
      'basic',
    );
    return guestTokens.accessToken;
  }

  async getMemberAccessToken() {
    const client = new TribeClient({
      clientId: process.env.TRIBE_CLIENT_ID,
      clientSecret: process.env.TRIBE_CLIENT_SECRET,
      graphqlUrl: 'https://app.tribe.so/graphql',
    });
    return client
      .generateToken({
        networkId: process.env.TRIBE_NETWORK_ID,
        memberId: process.env.TRIBE_MEMBER_ID,
      })
      .then(async (accessToken) => {
        return accessToken;
      });
  }

  async createTribeUser(data) {
    const client = new TribeClient({
      clientId: process.env.TRIBE_CLIENT_ID,
      clientSecret: process.env.TRIBE_CLIENT_SECRET,
      graphqlUrl: 'https://app.tribe.so/graphql',
    });
    const token = client.generateToken({
      networkId: process.env.TRIBE_NETWORK_ID,
      memberId: process.env.TRIBE_MEMBER_ID,
    });
    client.setToken(await token);
    return client.auth.joinNetwork(
      {
        input: {
          email: data.email,
          name: data.firstname + ' ' + data.lastname,
          password: data.password,
          username: data.firstname + data.lastname + Math.random() * 100,
        },
      },
      'basic',
    );
  }
}
