require("dotenv").config();
const { exec } = require("child_process");

async function publish() {
  const privateKey = process.env.VITE_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY;
  const network = process.env.VITE_APP_NETWORK || "testnet";
  
  // Determine the node URL based on the network
  const nodeUrl = network === "mainnet" 
    ? "https://fullnode.mainnet.aptoslabs.com/v1"
    : `https://fullnode.${network}.aptoslabs.com/v1`;

  if (!privateKey) {
    throw new Error("VITE_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY is not set in your .env file.");
  }

  // This command publishes the contract to the account associated with the private key.
  // The named addresses in Move.toml will be resolved to this account address.
  // The `init_module` function is automatically called on the first publish.
  const command = [
    "aptos",
    "move",
    "publish",
    "--package-dir",
    "contract",
    "--url",
    nodeUrl,
    "--private-key",
    privateKey,
    "--assume-yes", // Automatically confirm the transaction
    "--verbose", // Get detailed output
  ].join(" ");

  console.log("Publishing contract to your account...");
  console.log(`Executing command...`);

  const child = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error publishing contract:`);
      console.error(stderr);
      // Throwing an error will cause the script to exit with a non-zero code
      throw new Error(`Failed to publish contract. Details above.`);
    }
    
    console.log(stdout);
    if(stderr) {
      console.warn(`Warning during publish: ${stderr}`);
    }

    console.log("\n✅ Contract published successfully!");
    console.log("The 'get_abi' script will now run to update your frontend interface.");
  });

  // Pipe stdout and stderr to the parent process to see the output in real-time
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

publish();