import 'regenerator-runtime';
import { Wallet } from './near-wallet';


// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const CONTRACT_ADDRESS = process.env.CONTRACT_NAME
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })
const account = await nearConnection.account();



// Setup on page load
window.onload = async () => {
  let isSignedIn = await wallet.startUp();

  if (isSignedIn) {
    signedInFlow();
  } else {
    signedOutFlow();
  }
};
// Button clicks
$ = (e) => document.querySelector(e)
$('#sign-in-button').onclick = () => { wallet.signIn(); };
$('#sign-out-button').onclick = () => { wallet.signOut(); };
async function fetchScore(){
  console.log(wallet.accountId)
  const score = await wallet.viewMethod({ contractId: CONTRACT_ADDRESS, method: 'points_of', args: {player: wallet.accountId} });

  document.querySelectorAll('[data-behavior=points]').forEach(el => {
    el.innerText = score;
  });
}
// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelectorAll('#signed-in-flow').forEach(el => {
    el.style.display = 'none';
  });

  document.querySelectorAll('#signed-out-flow').forEach(el => {
    el.style.display = 'block';
  });
}
// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelectorAll('#signed-in-flow').forEach(el => {
    el.style.display = 'block';
  });
  document.querySelectorAll('#signed-out-flow').forEach(el => {
    el.style.display = 'none';
  });
  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = wallet.accountId;
  });

  fetchScore();
}
