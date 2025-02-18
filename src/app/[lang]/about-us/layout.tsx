export default async function Root(props: { children: React.ReactNode }) {
  const { children } = props;

  return <section>{children}</section>;
}
