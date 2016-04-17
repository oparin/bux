<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/16/15
 * Time: 5:10 PM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\Admin\AdvertisementsBundle\Entity\AutoSerfCategories;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadAutoSerfCategoriesData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadAutoSerfCategoriesData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $category = new AutoSerfCategories();
//        $category->setName('Tryme');
//        $category->setSeconds(10);
//        $category->setCredits(2);
//        $category->setTime(10);
//        $category->setRefEarning(true);
//        $manager->persist($category);
//        $this->addReference('autoserf_category_tryme', $category);
//
//        $category = new AutoSerfCategories();
//        $category->setName('Lollipop Ads');
//        $category->setSeconds(20);
//        $category->setCredits(5);
//        $category->setTime(20);
//        $category->setRefEarning(true);
//        $manager->persist($category);
//        $this->addReference('autoserf_category_lollipop', $category);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 7;
    }
}