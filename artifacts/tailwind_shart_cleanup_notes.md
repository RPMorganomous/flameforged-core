

# Tailwind Framework Decision Notes

**Date:** November 6, 2025  
**Author:** Triss Eternal

## Summary
We decided to **continue using Tailwind CSS for Phase II** of the FlameForged Command Center.  
The current React + Vite + Tailwind stack is stable and now properly configured after resolving earlier layout and overflow issues.

### Why We’re Keeping It
- **Speed of iteration:** Rapid prototyping directly within JSX/TSX.  
- **Visual control:** Ideal for dark command-style interfaces with gradients, shadows, and responsive spacing.  
- **Performance:** Works seamlessly with Vite’s hot module reload and fast builds.

### Known Pitfalls
- Class bloat can make markup messy.  
- Certain combinations (`h-screen`, `flex`, `overflow-hidden`) can cause layout clipping if not handled carefully.  
- Dynamic class names must be explicitly defined so Tailwind’s purge process doesn’t remove them.

### Mitigation Plan
- Maintain consistent layout components (ConsoleLayout, CommandCenter) with tested flex patterns.  
- Use static class strings when possible.  
- Log any new Tailwind issues directly here for quick debugging reference.

### Future Options
When the Command Center evolves into a desktop app, we may migrate to:
- **Shadcn/UI** — Retains Tailwind syntax but offers more structured components.  
- **Chakra UI** — Easier long-term maintenance and built-in dark mode.  
- **Styled Components** — For projects requiring dynamic theming and isolation.

---

**Next Action:**  
Tag this decision as `Tailwind_Stable_Baseline_v0.1.0` in the artifact index for future traceability.