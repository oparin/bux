<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/4/15
 * Time: 4:21 PM
 */

namespace Bux\AccountBundle\Form\Type\Ads;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class AdMembershipFormType
 *
 * @package Bux\AccountBundle\Form\Type\Ads
 */
class AdMembershipFormType extends AbstractType
{
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'class' => 'Bux\UserBundle\Entity\Membership',
            'property'  => 'name',
            'expanded'  => true,
            'multiple'  => true,
            'required'  => false
        ));
    }

    /**
     * @return string
     */
    public function getParent()
    {
        return 'entity';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ad_membership';
    }
}