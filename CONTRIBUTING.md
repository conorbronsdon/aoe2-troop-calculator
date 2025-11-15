# Contributing to AoE2 Troop Calculator

Thank you for your interest in contributing to the AoE2 Troop Calculator! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please:

- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/aoe2-troop-calculator.git
   cd aoe2-troop-calculator
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

For detailed setup instructions, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## Development Workflow

### Before You Start

- Check existing issues to avoid duplicate work
- For large changes, open an issue first to discuss the approach
- Ensure your fork is up to date with the main repository

### Making Changes

1. Write clean, readable code following our [Coding Standards](#coding-standards)
2. Add tests for new functionality
3. Update documentation as needed
4. Test your changes thoroughly:
   ```bash
   npm test
   npm run build
   ```

### Commit Messages

Write clear, concise commit messages that explain **why** the change was made:

**Good examples:**
- `Add tech tree validation for civilization units`
- `Fix resource calculation for Goths infantry discount`
- `Improve performance of unit filtering with useMemo`

**Bad examples:**
- `Fixed stuff`
- `Update code`
- `WIP`

**Format:**
```
<type>: <subject>

<body> (optional)

<footer> (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Coding Standards

### JavaScript/React

- Use ES6+ syntax
- Prefer functional components with hooks
- Use meaningful variable and function names
- Keep functions small and focused (single responsibility)
- Avoid deep nesting (max 3 levels)

### File Organization

```
src/
  components/     # React components
  context/        # React context providers
  data/           # Game data (units, civilizations)
  services/       # Business logic services
  utils/          # Utility functions
  constants.js    # Application constants
```

### Code Style

This project uses ESLint and Prettier for code formatting:

```bash
# Check for linting issues
npm run lint

# Auto-fix formatting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

**Key style rules:**
- 2 spaces for indentation
- Single quotes for strings (except JSX)
- Semicolons required
- Max line length: 100 characters
- Trailing commas in ES5 contexts

### React Best Practices

- Use prop-types for component props validation
- Memoize expensive calculations with `useMemo`
- Use `useCallback` for event handlers passed to children
- Keep component state minimal
- Extract reusable logic into custom hooks

### Testing

- Write tests for all new functionality
- Test edge cases and error scenarios
- Use descriptive test names:
  ```javascript
  describe('calculateUnitCost', () => {
    it('should apply Goths infantry discount correctly', () => {
      // test implementation
    });
  });
  ```

## Submitting Changes

### Pull Request Process

1. **Ensure your code passes all checks:**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

2. **Update documentation** if you've changed functionality

3. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** with:
   - Clear title describing the change
   - Description of what was changed and why
   - Link to related issue(s)
   - Screenshots for UI changes

5. **Respond to feedback** from maintainers

### Pull Request Template

```markdown
## Summary
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
Describe how you tested these changes

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Fixes #<issue_number>
```

### Code Review

Pull requests will be reviewed for:
- Code quality and adherence to standards
- Test coverage
- Performance implications
- Security considerations
- Documentation completeness

## Reporting Issues

### Recognition & Credits

**We value all contributions!** Bug reporters, testers, and contributors will be credited in the project:

- **Bug Hunters**: Added to the "Bug Hunters & Testers" section in README.md
- **Contributors**: Listed with their specific contribution and issue/PR link
- **Recognition Format**: `[@username](GitHub profile) | Brief description of contribution ([#issue](link))`

When fixing a reported bug, always:
1. Credit the reporter in the README.md "Bug Hunters & Testers" section
2. Link to the original issue in the PR
3. Thank the reporter in the commit message or PR description

This ensures our community members receive proper recognition for helping improve the project.

### Bug Reports

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots or error messages
- Console errors (if applicable)

**Template:**
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Version: [e.g., 2.3.0]

**Additional Context**
Any other relevant information.
```

## Feature Requests

For new features:

1. Check the [ROADMAP.md](./ROADMAP.md) to see if it's already planned
2. Open an issue with:
   - Clear description of the feature
   - Use case / why it's valuable
   - Proposed implementation (optional)
   - Mockups or examples (if applicable)

## Areas for Contribution

### High Priority
- Expanding test coverage for components
- Adding tech tree restrictions for civilizations
- Completing civilization bonus data
- Improving accessibility (a11y)

### Medium Priority
- Performance optimizations
- UI/UX improvements
- Additional export formats
- Mobile responsiveness

### Documentation
- Improving inline code documentation
- Creating tutorials
- Adding examples to README
- Translating documentation

## Questions?

If you have questions about contributing:
- Open a discussion on GitHub
- Check existing issues and discussions
- Review the codebase and documentation

Thank you for contributing to the AoE2 Troop Calculator!
