<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/2/15
 * Time: 12:50 PM
 */

namespace Bux\Admin\SetupBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class StaticPageFormType
 *
 * @package Bux\Admin\SetupBundle\Form\Type
 */
class StaticPageFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('content', 'textarea', array(
                'required'  => false,
                'attr'      => array(
                    'class' => 'tinymce'
                )
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\SetupBundle\Entity\StaticPage',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'static_page_form_type';
    }
}