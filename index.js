import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { google } from "googleapis";
import { schedule } from "node-cron";

config();

const discordClient = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds
  ]
})

const youtubeClient = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
})

let lastVideoId = ''

discordClient.login(process.env.DISCORD_TOKEN)

discordClient.on('ready', () => {
  console.log(`Bot online, logado como: ${discordClient.user.tag}`)
  checkNewVideos()
})

async function checkNewVideos(){
  try {
    const response = await youtubeClient.search.list({
      channelId: "@UCzLK-QUAMVjG74xhus4mLbg",
      order: 'date',
      part: 'snippet',
      type: 'video',
      maxResults: 1
    }).then (res => res)
    const latestVideo = response.data.items[0]
    console.log(latestVideo)
  } catch {

  }
}