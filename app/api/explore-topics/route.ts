import { NextRequest, NextResponse } from 'next/server';
import { getDeepseekCompletion } from '@/lib/deepseek';
import { DEEPSEEK_API_KEY } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json();

    if (!keyword) {
      return NextResponse.json({ error: '请提供关键词' }, { status: 400 });
    }

    const topics = await getDeepseekCompletion(
      `请为我推荐5个与"${keyword}"相关的学习主题，每个主题不超过10个字，用逗号分隔。`,
      DEEPSEEK_API_KEY
    );

    return NextResponse.json({ topics });
  } catch (error: any) {
    console.error('探索主题失败:', error);
    return NextResponse.json(
      { error: error.message || '探索主题失败' },
      { status: 500 }
    );
  }
}
