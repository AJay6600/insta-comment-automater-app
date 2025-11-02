import type {
  CommentsPerSelectedAccountsDataType,
  InstagramAccountDetailsType,
} from "../types";

export const assignCommentsToAccounts = (
  comments: string[],
  accounts: InstagramAccountDetailsType[],
  commentsPerAccount: number
): CommentsPerSelectedAccountsDataType[] => {
  const result: CommentsPerSelectedAccountsDataType[] = [];
  let commentIndex = 0;

  for (const account of accounts) {
    if (commentIndex >= comments.length) break; // stop if no comments left

    const assignedComments = comments.slice(
      commentIndex,
      commentIndex + commentsPerAccount
    );

    result.push({
      ...account,
      comments: assignedComments,
    });

    commentIndex += assignedComments.length; // move pointer forward
  }

  return result;
};
