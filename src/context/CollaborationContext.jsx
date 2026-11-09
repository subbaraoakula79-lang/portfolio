import { createContext, useContext } from 'react';
import { useHeroCollaboration } from '../hooks/useHeroCollaboration';

const CollaborationContext = createContext(null);

export const CollaborationProvider = ({ children }) => {
    const collabState = useHeroCollaboration();

    return (
        <CollaborationContext.Provider value={collabState}>
            {children}
        </CollaborationContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCollaboration = () => {
    const context = useContext(CollaborationContext);
    if (!context) {
        // Safe fallback if used outside provider
        return {
            stageIndex: 12,
            phase: 'COMPLETE',
            buildState: {
                isComplete: true,
                showProfile: true,
                showHeadline: true,
                headlineWordsVisibleCount: 5,
                showSubheadline: true,
                showCta: true,
                colorsApplied: true,
                showStats: true,
                showScrollIndicator: true,
                showAboutBio: true,
                showAboutSkills: true,
                showProjects1: true,
                showProjects2: true,
                showMilestones: true,
                showContact: true,
            },
            config: { enabled: false },
            elementStates: {},
            assetsPrecached: true,
        };
    }
    return context;
};

export default CollaborationContext;
