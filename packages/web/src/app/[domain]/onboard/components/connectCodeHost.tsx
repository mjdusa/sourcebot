'use client';

import { useState } from "react";
import { CodeHostType } from "@/lib/utils";
import { getCodeHostIcon } from "@/lib/utils";
import {
    GitHubConnectionCreationForm,
    GitLabConnectionCreationForm,
    GiteaConnectionCreationForm,
    GerritConnectionCreationForm,
    BitbucketCloudConnectionCreationForm,
    BitbucketDataCenterConnectionCreationForm
} from "@/app/[domain]/components/connectionCreationForms";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { OnboardingSteps } from "@/lib/constants";
import { BackButton } from "./onboardBackButton";
import { CodeHostIconButton } from "../../components/codeHostIconButton";
import useCaptureEvent from "@/hooks/useCaptureEvent";
import SecurityCard from "@/app/components/securityCard";

interface ConnectCodeHostProps {
    nextStep: OnboardingSteps;
    securityCardEnabled: boolean;
}

export const ConnectCodeHost = ({ nextStep, securityCardEnabled }: ConnectCodeHostProps) => {
    const [selectedCodeHost, setSelectedCodeHost] = useState<CodeHostType | null>(null);
    const router = useRouter();

    const onCreated = useCallback(() => {
        router.push(`?step=${nextStep}`);
    }, [nextStep, router]);

    const onBack = useCallback(() => {
        setSelectedCodeHost(null);
    }, []);

    if (!selectedCodeHost) {
        return (
            <>
                <CodeHostSelection onSelect={setSelectedCodeHost} />
                {securityCardEnabled && <SecurityCard />}
            </>
        )
    }

    if (selectedCodeHost === "github") {
        return (
            <>
                <BackButton onClick={onBack} />
                <GitHubConnectionCreationForm onCreated={onCreated} />
            </>
        )
    }

    if (selectedCodeHost === "gitlab") {
        return (
            <>
                <BackButton onClick={onBack} />
                <GitLabConnectionCreationForm onCreated={onCreated} />
            </>
        )
    }

    if (selectedCodeHost === "gitea") {
        return (
            <>
                <BackButton onClick={onBack} />
                <GiteaConnectionCreationForm onCreated={onCreated} />
            </>
        )
    }

    if (selectedCodeHost === "gerrit") {
        return (
            <>
                <BackButton onClick={onBack} />
                <GerritConnectionCreationForm onCreated={onCreated} />
            </>
        )
    }

    if (selectedCodeHost === "bitbucket-cloud") {
        return (
            <>
                <BackButton onClick={onBack} />
                <BitbucketCloudConnectionCreationForm onCreated={onCreated} />
            </>
        )
    }

    if (selectedCodeHost === "bitbucket-server") {
        return (
            <>
                <BackButton onClick={onBack} />
                <BitbucketDataCenterConnectionCreationForm onCreated={onCreated} />
            </>
        )
    }

    return null;
}

interface CodeHostSelectionProps {
    onSelect: (codeHost: CodeHostType) => void;
}

const CodeHostSelection = ({ onSelect }: CodeHostSelectionProps) => {
    const captureEvent = useCaptureEvent();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <CodeHostIconButton
                name="GitHub"
                logo={getCodeHostIcon("github")!}
                onClick={() => {
                    onSelect("github");
                    captureEvent("wa_onboard_github_selected", {});
                }}
            />
            <CodeHostIconButton
                name="GitLab"
                logo={getCodeHostIcon("gitlab")!}
                onClick={() => {
                    onSelect("gitlab");
                    captureEvent("wa_onboard_gitlab_selected", {});
                }}
            />
            <CodeHostIconButton
                name="Bitbucket Cloud"
                logo={getCodeHostIcon("bitbucket-cloud")!}
                onClick={() => {
                    onSelect("bitbucket-cloud");
                    captureEvent("wa_onboard_bitbucket_cloud_selected", {});
                }}
            />
            <CodeHostIconButton
                name="Bitbucket DC"
                logo={getCodeHostIcon("bitbucket-server")!}
                onClick={() => {
                    onSelect("bitbucket-server");
                    captureEvent("wa_onboard_bitbucket_server_selected", {});
                }}
            />
            <CodeHostIconButton
                name="Gitea"
                logo={getCodeHostIcon("gitea")!}
                onClick={() => {
                    onSelect("gitea");
                    captureEvent("wa_onboard_gitea_selected", {});
                }}
            />
            <CodeHostIconButton
                name="Gerrit"
                logo={getCodeHostIcon("gerrit")!}
                onClick={() => {
                    onSelect("gerrit");
                    captureEvent("wa_onboard_gerrit_selected", {});
                }}
            />
        </div>
    )
}
