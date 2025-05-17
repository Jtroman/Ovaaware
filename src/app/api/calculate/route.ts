import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { RiskAssessmentInputSchema } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate input data
    const validationResult = RiskAssessmentInputSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    // Call Python script
    const pythonProcess = spawn('python3', ['/Users/justinemach/Ovaaware/src/app.py'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // Send data to Python script
    pythonProcess.stdin.write(JSON.stringify(data));
    pythonProcess.stdin.end();

    // Collect output
    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    // Wait for Python script to complete
    await new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(new Error(`Python process exited with code ${code}`));
        }
      });
    });

    if (error) {
      console.error('Python script error:', error);
      return NextResponse.json({ error: 'Risk calculation failed' }, { status: 500 });
    }

    try {
      const riskResult = JSON.parse(result);
      return NextResponse.json(riskResult);
    } catch (e) {
      console.error('Failed to parse Python output:', result);
      return NextResponse.json({ error: 'Invalid risk calculation result' }, { status: 500 });
    }
  } catch (e) {
    console.error('API error:', e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 