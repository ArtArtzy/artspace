export const communitySpoilerPattern = /\|\|([\s\S]*?)\|\|/g;

export function communityPostPreview(body: string) {
  return body.replace(communitySpoilerPattern, "[สปอยล์]");
}
