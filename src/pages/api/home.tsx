import { NextApiRequest, NextApiResponse } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default function Homepage(req: NextApiRequest, res: NextApiResponse) {
    res.json({status:"OK"});
   
}