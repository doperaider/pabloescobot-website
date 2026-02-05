import { NextRequest, NextResponse } from 'next/server';

// Discord invite link - replace with your actual Discord invite link
const DISCORD_INVITE_URL = 'https://discord.gg/doperaider'; // Replace with actual Discord invite

export async function POST(request: NextRequest) {
  try {
    // Get the bot identifier from the request body
    const body = await request.json();
    const { botId, botName, platform } = body;

    // Log the bot joining attempt
    console.log(`Bot join request: ${botId} (${botName}) from ${platform}`);

    // For now, just return the Discord invite URL
    // In the future, you could:
    // 1. Validate the bot identifier
    // 2. Log the join attempt to a database
    // 3. Generate unique invite links per bot
    // 4. Rate limit requests
    // 5. Verify bot authenticity

    return NextResponse.json({
      success: true,
      discordInviteUrl: DISCORD_INVITE_URL,
      message: 'Welcome to the DopeRaider Discord!',
      botId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing Discord invite request:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process request',
        discordInviteUrl: DISCORD_INVITE_URL // Still provide the URL even on error
      },
      { status: 500 }
    );
  }
}

// Also support GET requests for simple access
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    discordInviteUrl: DISCORD_INVITE_URL,
    message: 'Use POST with bot details for tracking',
    apiEndpoint: '/api/discord-invite',
    method: 'POST',
    requiredBody: {
      botId: 'string (unique bot identifier)',
      botName: 'string (bot display name)',
      platform: 'string (platform name, e.g., "moltbook", "telegram", "openclaw")'
    }
  });
}