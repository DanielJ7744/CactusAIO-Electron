export const transformToSocketData = (task, profile, settings, proxyGroup) => {
  const taskField = {
    id: task.id,
    groupId: task.groupId,
    site: task.site,
    region: 'FR',
    input: task.item,
    size: task.size,
    mode: task.mode,
    dummy: '',
    payment: '',
    delay: settings.errorDelay,
    timeout: settings.retryDelay,
    account: {
      guest: true,
      email: null,
      password: null,
    },
    captcha: {
      '2captcha': setting.twoCapApiKey,
      Capmonster: settings.capMonsterApiKey,
      Anticaptcha: settings.antiCapApiKey,
      priority: ['2captcha', 'Anticaptcha', 'Capmonster'],
    },
    discord: {
      webhook:
        'https://discord.com/api/webhooks/886982959008210994/5d67-kdJ5aCKvVZh4nJnqJVAn_yuZLiiSOu2ZQd1z7XcLFa8jVxDCY367jonShS7ZiKo',
      userId: '584472236812140545',
      userTag: '2725',
      userName: 'IHateTomLrge',
      userAvatar:
        'https://cdn.discordapp.com/avatars/584472236812140545/149a77a8b76013e912a03c1d9bdc640b.png',
    },
  };
  const profileField = {
    groupId: profile.groupId,
    id: profile.id,
    name: profile.name,
    email: profile.email,
    shipping: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      houseNumber: '10',
      streetName: 'Rue Amelot',
      addressLine2: profile.addressLine2,
      city: profile.city,
      postCode: profile.postCode,
      countryLabel: profile.country,
      countryIso: 'FR',
      regionStateLabel: profile.state,
      regionStateIso: '259',
    },
    billing: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      houseNumber: '10',
      streetName: 'Rue Amelot',
      addressLine2: profile.addressLine2,
      city: profile.city,
      postCode: profile.postCode,
      countryLabel: profile.country,
      countryIso: 'FR',
      regionStateLabel: profile.state,
      regionStateIso: '259',
    },
    creditCard: {
      numbers: profile.card,
      month: profile.expirationDate.split('/')[1],
      year: profile.expirationDate.split('/')[0],
      holder: profile.holdName,
      type: 'Visa',
    },
  };
  const proxyField = {
    name: proxyGroup.name,
    id: proxyGroup.id,
    proxies: proxyGroup.proxies.map(v => v.proxy),
  };
  const data = {
    task: taskField,
    profile: profileField,
    proxy: proxyField,
  };

  return data;
};

//https://dashboard.cactus-aio.com/purchase/nfRy2vBeN94TGqXoeT4p7?password=526i6ex0MR3W
//CACTUS-HEVJ-VDKY-M2FC-ROXR

export async function sendLoginRequest(license_key, machine_fingerprint) {
  console.log(license_key, machine_fingerprint);
  const res = await fetch('http://api.cactus-aio.com/auth/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      license_key,
      machine_fingerprint,
    }),
  });
  console.log(res);
  if (res.ok) {
    const json = await res.json();
    console.log(json);
    if (json.success === true) {
      return json;
    } else {
      throw new Error('Wrong credential');
    }
  } else {
    throw new Error('Something went wrong');
  }
}
