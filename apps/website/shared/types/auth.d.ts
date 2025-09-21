declare module '#auth-utils' {
  interface User {
    id: string
    name: string
    email: string
    avatarUrl: string | null
  }

  interface UserGitHub {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: 'User'
    user_view_type: 'public'
    site_admin: boolean
    name: string | null
    company: string
    blog: string
    location: null
    email: string
    hireable: null
    bio: string
    twitter_username: null
    notification_email: string
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
  }

  interface UserTwitch {
    id: string
    login: string
    display_name: string
    type: ''
    broadcaster_type: 'affiliate'
    description: string
    profile_image_url: string
    offline_image_url: string
    view_count: number
    email: string
    created_at: string
  }

  interface UserYandex {
    id: string
    login: string
    client_id: string
    default_email: string
    emails: string[]
    display_name: string
    real_name: string
    first_name: string
    last_name: string
    sex: 'male'
    default_avatar_id: string
    is_avatar_empty: boolean
    psuid: string
  }

  interface UserVK {
    user: {
      user_id: string
      first_name: string
      last_name: string
      avatar: string
      email: string
      sex: number
      verified: boolean
      birthday: string
    }
  }
}

export {}
