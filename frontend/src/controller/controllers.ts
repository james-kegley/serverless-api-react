//sending user data to the api
export async function submitResponse(newUser: string[], ID: string): Promise<void> {
 const res: Response = await fetch(`http://localhost:3000/dev/insertUser/${ID}`, {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  })!
  //registration success message
  const submitRes: object = await res.json();
  console.log(submitRes);
}


//retreving user data from the api
export async function getResponse(): Promise<number> {
  const res: Response = await fetch(`http://localhost:3000/dev/getUsers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })! 
  const getRes = await res.json();
  //the count of users in DynamoDB
  const getCount: number = getRes.user.Count;
  return getCount;
}