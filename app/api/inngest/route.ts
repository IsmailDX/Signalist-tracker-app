import { inngest } from '@/lib/inngest/client';
import { sendSignUpEmail } from '@/lib/inngest/functions';
import { serve } from 'inngest/next';

// run: "npx inngest-cli@latest dev" on a second terminal during development to see logs
// To verify its working, go to localhost:8288 then apps, and u can see the functions

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendSignUpEmail],
});
