# Security Review Workflow

## Goal

Audit code for security vulnerabilities before production.

## Trigger

User requests `/security-scan` or security-reviewer starts security audit.

## Workflow Steps

1. **Check Secrets Handling**
   - Scan for hardcoded API keys, tokens, passwords
   - Check environment variables are used for secrets
   - Verify .env files are in .gitignore
   - No secrets in code, config, or comments

2. **Check Input Validation**
   - All user input is validated
   - Validation logic is consistent
   - Invalid input is rejected early
   - Error messages don't leak info

3. **Check Error Handling**
   - Generic error messages to users
   - Internal errors logged securely
   - Stack traces not exposed
   - No database errors visible

4. **Check Authentication/Authorization**
   - Auth tokens handled securely
   - Sessions timeout appropriately
   - Authorization checks present
   - No privilege escalation paths

5. **Check Data Handling**
   - Sensitive data not logged
   - HTTPS/TLS enforced in production
   - No unnecessary data exposure
   - Proper cleanup on errors

## Security Checklist

- [ ] No hardcoded secrets
- [ ] Input validation consistent
- [ ] Error handling is generic
- [ ] Authentication properly enforced
- [ ] Data handling is secure
- [ ] Dependencies are up-to-date (`npm audit`)
- [ ] No known vulnerabilities

## Validation

✅ No vulnerabilities found
✅ Security standards met
✅ Code is production-safe

## Handoff

Approved code ready for deployment.
