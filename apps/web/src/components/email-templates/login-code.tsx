export default function LoginCodeEmailTemplate({ code }: { code: string }) {
  return (
    <div>
      <p>
        Your login code is <strong>{code}</strong>
      </p>

      <p>This code will expire in 30 minutes.</p>
    </div>
  )
}
