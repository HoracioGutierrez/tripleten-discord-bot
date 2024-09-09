//const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, EmbedBuilder } = require('discord.js');

const TOKEN = process.env.DISCORD_SECRET;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CHANNEL_NAME = 'general';
const INSTRUCTOR_ROLE_NAME = 'Instructor';
const INSTRUCTORS_TAGS = [
  "horaciogutierrez"
]

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

let sessions = {};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const getChannel = async (state) => {
  return state.guild.channels.cache.find(channel => {
    return channel.type === 2 && channel.name.toLowerCase() === CHANNEL_NAME.toLowerCase();
  })
}

const handleColearningInstructorJoin = async (member) => {
  /* sessions[member.id] = {
        instructor: member.user.tag,
        startTime: Date.now(),
        students: new Set()
      };
      console.log(`Instructor ${member.user.tag} started a session.`); */
}

const handleColearningInstructorLeave = async (member) => {
  /* const session = sessions[member.id];
  if (session) {
    const duration = Math.round((Date.now() - session.startTime) / 60000); // Duration in minutes
    const report = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Co-Learning Space Session Report')
      .addFields(
        { name: 'Instructor', value: session.instructor },
        { name: 'Duration', value: `${duration} minutes` },
        { name: 'Number of Students', value: session.students.size.toString() },
        { name: 'Students', value: Array.from(session.students).join('\n') || 'No students joined' }
      )
      .setTimestamp();

    // Send report to a specific channel (adjust channel ID as needed)

    newState.guild.channels.cache.forEach(channel => {
      console.log(channel.id, channel.name);
    })

    const reportChannel = newState.guild.channels.cache.get('1282753881947766850');
    if (reportChannel) {
      await reportChannel.send({ embeds: [report] });
    }

    delete sessions[member.id];
    console.log(`Instructor ${member.user.tag} ended their session. Report generated.`);
  } */
}

const handleColearningStudentJoin = async (member) => {
  /* const currentSession = Object.values(sessions).find(session => session.startTime);
if (currentSession) {
  currentSession.students.add(member.user.tag);
  console.log(`Student ${member.user.tag} joined the session.`);
} */
}

const handleColearningStudentLeave = async (member) => {
  /*       const currentSession = Object.values(sessions).find(session => session.startTime);
            if (currentSession) {
              currentSession.students.delete(member.user.tag);
              console.log(`Student ${member.user.tag} left the session.`);
            } */
}

client.on('voiceStateUpdate', async (oldState, newState) => {

  const channel = await getChannel(newState);
  if (!channel) return;

  const member = newState.member;

  const isInstructor = INSTRUCTORS_TAGS.includes(member.user.tag)

  //join
  if (newState.channelId === channel.id && !oldState.channelId) {
    if (isInstructor) {
      handleColearningInstructorJoin(member);
    } else {
      handleColearningStudentJoin(member);
    }
  }

  //leave
  if (oldState.channelId === channel.id && !newState.channelId) {
    if (isInstructor) {
      handleColearningInstructorLeave(member);
    } else {
      handleColearningStudentLeave(member);
    }
  }
});

client.login(TOKEN);