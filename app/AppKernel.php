<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

/**
 * Class AppKernel
 */
class AppKernel extends Kernel
{
    /**
     * @return array|\Symfony\Component\HttpKernel\Bundle\BundleInterface[]
     */
    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new Bux\Admin\DashboardBundle\BuxAdminDashboardBundle(),
            new FOS\UserBundle\FOSUserBundle(),
            new Bux\UserBundle\BuxUserBundle(),
            new Bux\BlogBundle\BuxBlogBundle(),
            new Bux\HomeBundle\BuxHomeBundle(),
            new Bux\OfficeBundle\BuxOfficeBundle(),
            new Knp\Bundle\PaginatorBundle\KnpPaginatorBundle(),
            new Bux\Admin\BlogBundle\BuxAdminBlogBundle(),
            new Vich\UploaderBundle\VichUploaderBundle(),
            new Bux\WalletBundle\BuxWalletBundle(),
            new Bux\Admin\HomeBundle\BuxAdminHomeBundle(),
            new APY\DataGridBundle\APYDataGridBundle(),
            new Bux\Admin\MembersBundle\BuxAdminMembersBundle(),
            new Bux\AccountBundle\BuxAccountBundle(),
            new Bux\StatisticBundle\BuxStatisticBundle(),
            new Bux\Admin\DepositsBundle\BuxAdminDepositsBundle(),
            new Bux\Admin\WithdrawalsBundle\BuxAdminWithdrawalsBundle(),
            new Bux\Admin\SupportBundle\BuxAdminSupportBundle(),
            new Bux\Admin\AdvertisementsBundle\BuxAdminAdvertisementsBundle(),
            new Bux\AdvertiseBundle\BuxAdvertiseBundle(),
            new Sg\DatatablesBundle\SgDatatablesBundle(),
            new FOS\JsRoutingBundle\FOSJsRoutingBundle(),
            new Bux\EarnMoneyBundle\BuxEarnMoneyBundle(),
            new Bux\Admin\SetupBundle\BuxAdminSetupBundle(),
            new Bux\Admin\UtilitiesBundle\BuxAdminUtilitiesBundle(),
            new Stfalcon\Bundle\TinymceBundle\StfalconTinymceBundle(),
        );

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
            $bundles[] = new Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle();
            $bundles[] = new Symfony\Bundle\DebugBundle\DebugBundle();
        }

        return $bundles;
    }

    /**
     * @param LoaderInterface $loader
     */
    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }
}