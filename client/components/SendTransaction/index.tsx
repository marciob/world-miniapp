// import { useState, useEffect } from 'react';
// import { MiniKit, ResponseEvent, MiniAppSendTransactionPayload } from '@worldcoin/minikit-js';
// import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react';
// import DEXABI from '../../abi/DEX.json';

// export default function PayTransactionPage() {
//   const [transactionId, setTransactionId] = useState<string>('');

//   const client = createPublicClient({
//     chain: worldchain,
//     transport: http('https://worldchain-mainnet.g.alchemy.com/public'),
//   });

//   const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
//     client: client,
//     appConfig: {
//       app_id: '<app_id>',
//     },
//     transactionId: transactionId,
//   });

//   const sendTransactionCommand = () => {
//     const deadline = Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString();

//     const permitTransfer = {
//       permitted: {
//         token: '0xTokenAddress', // Replace with actual token address
//         amount: '10000',
//       },
//       nonce: Date.now().toString(),
//       deadline,
//     };

//     const permitTransferArgsForm = [
//       [permitTransfer.permitted.token, permitTransfer.permitted.amount],
//       permitTransfer.nonce,
//       permitTransfer.deadline,
//     ];

//     const transferDetails = {
//       to: '0xRecipientAddress', // Replace with actual recipient address
//       requestedAmount: '10000',
//     };

//     const transferDetailsArgsForm = [
//       transferDetails.to,
//       transferDetails.requestedAmount,
//     ];

//     MiniKit.commands.sendTransaction({
//       transaction: [
//         {
//           address: '0xContractAddress', // Replace with actual contract address
//           abi: DEXABI,
//           functionName: 'signatureTransfer',
//           args: [
//             permitTransferArgsForm,
//             transferDetailsArgsForm,
//             'PERMIT2_SIGNATURE_PLACEHOLDER_0',
//           ],
//         },
//       ],
//       permit2: [
//         {
//           ...permitTransfer,
//           spender: '0xContractAddress', // Replace with actual contract address
//         },
//       ],
//     });
//   };

//   useEffect(() => {
//     if (!MiniKit.isInstalled()) {
//       return;
//     }

//     MiniKit.subscribe(
//       ResponseEvent.MiniAppSendTransaction,
//       async (payload: MiniAppSendTransactionPayload) => {
//         if (payload.status === 'error') {
//           console.error('Error sending transaction', payload);
//         } else {
//           setTransactionId(payload.transaction_id);
//         }
//       }
//     );

//     return () => {
//       MiniKit.unsubscribe(ResponseEvent.MiniAppSendTransaction);
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Pay Transaction Page</h1>
//       <button onClick={sendTransactionCommand} disabled={isConfirming}>
//         {isConfirming ? 'Confirming...' : 'Send Transaction'}
//       </button>
//       {isConfirmed && <p>Transaction Confirmed!</p>}
//     </div>
//   );
// }