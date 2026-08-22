import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TextCheckPage } from '../pages/TextCheckPage';
import { UrlCheckPage } from '../pages/UrlCheckPage';
import { ImageCheckPage } from '../pages/ImageCheckPage';
import { HistoryPage } from '../pages/HistoryPage';
import { VerificationResultPage } from '../pages/VerificationResultPage';
import { ComprehensiveAgentStatus } from '../components/ui/ComprehensiveAgentStatus';
import { newsService } from '../services/newsService';
import type { VerificationResult } from '../types/verification';

// Mock newsService
vi.mock('../services/newsService', () => ({
  newsService: {
    checkText: vi.fn(),
    checkUrl: vi.fn(),
    checkImage: vi.fn(),
    getHistory: vi.fn(),
    getHistoryById: vi.fn(),
  },
}));

describe('TruthGuard AI Frontend Tests', () => {
  // 1. Text form validation
  it('1. Text form validation - shows error when submitting text under 10 chars', async () => {
    render(
      <MemoryRouter>
        <TextCheckPage />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText(/Paste or enter the news claim/i);
    const submitBtn = screen.getByRole('button', { name: /Verify Text Claim/i });

    // Try submitting empty text
    fireEvent.click(submitBtn);
    expect(await screen.findByText(/Please enter some text or an article excerpt to verify/i)).toBeInTheDocument();

    // Fill with less than 10 characters
    fireEvent.change(textarea, { target: { value: 'Short' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText(/Text is too short\. Please provide at least 10 characters for meaningful analysis/i)).toBeInTheDocument();
  });

  // 2. Image file validation
  it('2. Image file validation - rejects oversized images', async () => {
    render(
      <MemoryRouter>
        <ImageCheckPage />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText(/Upload claim screenshot/i) as HTMLInputElement;

    // Create file > 10MB (11MB)
    const largeFile = new File(['a'.repeat(11 * 1024 * 1024)], 'large-image.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(await screen.findByText(/File size exceeds maximum limit of 10MB/i)).toBeInTheDocument();
  });

  // 3. URL form validation
  it('3. URL form validation - rejects invalid URL format', async () => {
    render(
      <MemoryRouter>
        <UrlCheckPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/https:\/\/example.com\/article/i);
    const submitBtn = screen.getByRole('button', { name: /Verify Article URL/i });

    // Invalid URL string
    fireEvent.change(input, { target: { value: 'not-a-valid-url' } });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Please enter a valid URL starting with http:\/\/ or https:\/\//i)).toBeInTheDocument();
  });

  // 4. API service error normalization
  it('4. API service normalization - catches and displays normalized backend error', async () => {
    const errorMsg = 'Backend database connection timeout.';
    (newsService.checkText as any).mockRejectedValueOnce(new Error(errorMsg));

    render(
      <MemoryRouter>
        <TextCheckPage />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText(/Paste or enter the news claim/i);
    const submitBtn = screen.getByRole('button', { name: /Verify Text Claim/i });

    fireEvent.change(textarea, { target: { value: 'Valid statement for multi agent verification testing.' } });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(errorMsg)).toBeInTheDocument();
  });

  // 5. Result rendering for REAL
  it('5. Result rendering for REAL - displays REAL verdict badge and confidence', async () => {
    const realResult: VerificationResult = {
      verificationId: 'test-real-1',
      verdict: 'REAL',
      confidence: 94,
      summary: 'Verified authentic claim',
      explanation: 'Consensus verified statement.',
      createdAt: new Date().toISOString(),
      agentResults: [],
      keyEvidence: [],
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/result/test-real-1', state: { result: realResult } }]}>
        <VerificationResultPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/VERDICT: REAL/i)).toBeInTheDocument();
    expect(screen.getByText('94%')).toBeInTheDocument();
    expect(screen.getByText('Verified authentic claim')).toBeInTheDocument();
  });

  // 6. Result rendering for FAKE
  it('6. Result rendering for FAKE - displays FAKE verdict badge and explanation', async () => {
    const fakeResult: VerificationResult = {
      verificationId: 'test-fake-1',
      verdict: 'FAKE',
      confidence: 91,
      summary: 'Fabricated news claim',
      explanation: 'Contradicted by primary news sources.',
      createdAt: new Date().toISOString(),
      agentResults: [],
      keyEvidence: [],
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/result/test-fake-1', state: { result: fakeResult } }]}>
        <VerificationResultPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/VERDICT: FAKE/i)).toBeInTheDocument();
    expect(screen.getByText('91%')).toBeInTheDocument();
    expect(screen.getByText('Fabricated news claim')).toBeInTheDocument();
  });

  // 7. Result rendering for UNCERTAIN
  it('7. Result rendering for UNCERTAIN - displays UNCERTAIN verdict badge', async () => {
    const uncertainResult: VerificationResult = {
      verificationId: 'test-uncertain-1',
      verdict: 'UNCERTAIN',
      confidence: 52,
      summary: 'Insufficient or conflicting evidence',
      explanation: 'Evidence is ambiguous.',
      createdAt: new Date().toISOString(),
      agentResults: [],
      keyEvidence: [],
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/result/test-uncertain-1', state: { result: uncertainResult } }]}>
        <VerificationResultPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/VERDICT: UNCERTAIN/i)).toBeInTheDocument();
    expect(screen.getByText('52%')).toBeInTheDocument();
  });

  // 8. Mixed agent results
  it('8. Mixed agent results - renders agreement breakdown with supporting and contradicting agents', () => {
    const mixedAgents = [
      { agent: 'Agent A', verdict: 'SUPPORTS' as const, confidence: 88, summary: 'Agrees' },
      { agent: 'Agent B', verdict: 'CONTRADICTS' as const, confidence: 75, summary: 'Disagrees' },
    ];

    render(<ComprehensiveAgentStatus agentResults={mixedAgents} />);

    expect(screen.getByText('Agent A')).toBeInTheDocument();
    expect(screen.getByText('SUPPORTS')).toBeInTheDocument();
    expect(screen.getByText('Agent B')).toBeInTheDocument();
    expect(screen.getByText('CONTRADICTS')).toBeInTheDocument();
    expect(screen.getByText(/50% Consensus Agreement/i)).toBeInTheDocument();
  });

  // 9. Missing/failed agent
  it('9. Missing/failed agent - handles missing agent results gracefully without crashing', () => {
    const incompleteAgents = [
      { agent: 'Agent Active', verdict: 'SUPPORTS' as const, confidence: 90, summary: 'Active' },
      { agent: 'Agent Failed', verdict: 'INSUFFICIENT' as const, confidence: 0, summary: 'Agent failed processing query.' },
    ];

    render(<ComprehensiveAgentStatus agentResults={incompleteAgents} />);

    expect(screen.getByText('Agent Active')).toBeInTheDocument();
    expect(screen.getByText('Agent Failed')).toBeInTheDocument();
    expect(screen.getByText('INSUFFICIENT')).toBeInTheDocument();
  });

  // 10. History empty state
  it('10. History empty state - renders empty state UI when history list is empty', async () => {
    (newsService.getHistory as any).mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/No Verifications Found/i)).toBeInTheDocument();
    expect(screen.getByText(/You have not performed any claim verifications yet./i)).toBeInTheDocument();
  });
});
