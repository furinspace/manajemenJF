'use server';

/**
 * @fileOverview A delivery prioritization AI agent.
 *
 * - prioritizeDeliveries - A function that handles the delivery prioritization process.
 * - PrioritizeDeliveriesInput - The input type for the prioritizeDeliveries function.
 * - PrioritizeDeliveriesOutput - The return type for the prioritizeDeliveries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeDeliveriesInputSchema = z.object({
  orders: z
    .string()
    .describe(
      'A list of orders with details including order ID, deadline, customer priority, and delivery location.'
    ),
});
export type PrioritizeDeliveriesInput = z.infer<typeof PrioritizeDeliveriesInputSchema>;

const PrioritizeDeliveriesOutputSchema = z.object({
  prioritizedShipments: z
    .string()
    .describe(
      'A list of shipments ready for packing, prioritized based on order deadlines, customer priority, and delivery location.'
    ),
});
export type PrioritizeDeliveriesOutput = z.infer<typeof PrioritizeDeliveriesOutputSchema>;

export async function prioritizeDeliveries(
  input: PrioritizeDeliveriesInput
): Promise<PrioritizeDeliveriesOutput> {
  return prioritizeDeliveriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeDeliveriesPrompt',
  input: {schema: PrioritizeDeliveriesInputSchema},
  output: {schema: PrioritizeDeliveriesOutputSchema},
  prompt: `You are an AI assistant helping to prioritize shipments for packing.

  Given the following list of orders, prioritize them based on the following criteria:

  1.  Order Deadline: Orders with earlier deadlines should be prioritized higher.
  2.  Customer Priority: Orders from high-priority customers should be prioritized higher.
  3.  Delivery Location: Orders with delivery locations that are closer or easier to reach should be prioritized higher.

  Orders:
  {{{orders}}}

  Provide a list of shipments ready for packing, prioritized according to the criteria above.
  `,
});

const prioritizeDeliveriesFlow = ai.defineFlow(
  {
    name: 'prioritizeDeliveriesFlow',
    inputSchema: PrioritizeDeliveriesInputSchema,
    outputSchema: PrioritizeDeliveriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
